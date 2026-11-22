"""
AgriNova AI - Multilingual AI Voice Assistant Engine
Natural language intent parsing across 12 Indian regional languages,
real-time data integration with weather, disease, fertilizer, market, and schemes.
"""

import re
from flask import Blueprint, request, jsonify
from modules.india_districts import find_district_by_name, INDIA_STATES_DISTRICTS
from modules.weather_service import compute_accurate_agro_weather
from modules.market_prediction import train_and_forecast_prices, COMMODITY_BASELINES
from modules.fertilizer_engine import calculate_recommendation
from modules.disease_detection import DISEASE_DATABASE
from modules.government_schemes import SCHEMES_DATABASE

voice_bp = Blueprint("voice", __name__, url_prefix="/api/voice")

# Multilingual Responses Dictionary for Core Intents
TRANSLATED_RESPONSES = {
    "weather": {
        "en": "Today in {city}, the weather is {condition} with a temperature of {temp}°C and {rain_prob}% rain probability. {advisory}",
        "hi": "आज {city} में मौसम {condition} है, तापमान {temp}°C और बारिश की संभावना {rain_prob}% है। कृषि सलाह: {advisory}",
        "pa": "ਅੱਜ {city} ਵਿੱਚ ਮੌਸਮ {condition} ਹੈ, ਤਾਪਮਾਨ {temp}°C ਅਤੇ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ {rain_prob}% ਹੈ। {advisory}",
        "bn": "আজ {city}-তে আবহাওয়া {condition}, তাপমাত্রা {temp}°C এবং বৃষ্টির সম্ভাবনা {rain_prob}%। {advisory}",
        "mr": "आज {city} मध्ये हवामान {condition} आहे, तापमान {temp}°C आणि पावसाची शक्यता {rain_prob}% आहे. {advisory}",
        "gu": "આજે {city} માં હવામાન {condition} છે, તાપમાન {temp}°C અને વરસાદની શક્યતા {rain_prob}% છે. {advisory}",
        "ta": "இன்று {city} இல் வானிலை {condition}, வெப்பநிலை {temp}°C மற்றும் மழை வாய்ப்பு {rain_prob}%. {advisory}",
        "te": "ఈరోజు {city} లో వాతావరణం {condition}, ఉష్ణోగ్రత {temp}°C మరియు వర్షం సంభావ్యత {rain_prob}%. {advisory}",
        "kn": "ಇಂದು {city} ನಲ್ಲಿ ಹವಾಮಾನ {condition}, ತಾಪಮಾನ {temp}°C ಮತ್ತು ಮಳೆ ಸಾಧ್ಯತೆ {rain_prob}%. {advisory}",
        "ml": "ഇന്ന് {city} ൽ കാലാവസ്ഥ {condition}, താപനില {temp}°C, മഴ സാധ്യത {rain_prob}%. {advisory}",
        "or": "ଆଜି {city} ରେ ପାଗ {condition}, ତାପମାତ୍ରା {temp}°C ଏବଂ ବର୍ଷା ସମ୍ଭାବନା {rain_prob}%। {advisory}",
        "as": "আজি {city} ত বতৰ {condition}, উষ্ণতা {temp}°C আৰু বৰষুণৰ সম্ভাৱনা {rain_prob}%। {advisory}"
    },
    "market": {
        "en": "The current modal market price for {crop} is ₹{price} per Quintal. The ML model predicts a {trend} trend to ₹{pred} over the next 15 days.",
        "hi": "{crop} का वर्तमान मंडी मॉडल भाव ₹{price} प्रति क्विंटल है। 15 दिनों में भाव ₹{pred} तक जाने का अनुमान है।",
        "pa": "{crop} ਦਾ ਮੌਜੂਦਾ ਮੰਡੀ ਭਾਅ ₹{price} ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ। ਅਗਲੇ 15 ਦਿਨਾਂ ਵਿੱਚ ਭਾਅ ₹{pred} ਹੋਣ ਦਾ ਅਨੁਮਾਨ ਹੈ।",
        "bn": "{crop}-এর বর্তমান বাজার দর কুইন্টাল প্রতি ₹{price}। আগামী ১৫ দিনে দর ₹{pred} হওয়ার পূর্বাভাস রয়েছে।",
        "mr": "{crop} चा सध्याचा बाजारभाव ₹{price} प्रति क्विंटल आहे. पुढील १५ दिवसांत भाव ₹{pred} राहण्याचा अंदाज आहे.",
        "gu": "{crop} નો વર્તમાન બજાર ભાવ ક્વિન્ટલ દીઠ ₹{price} છે. આગામੀ 15 દિવસમાં ભાવ ₹{pred} થવાની ધારણા છે.",
        "ta": "{crop} இன் தற்போதைய சந்தை விலை குவிண்டாலுக்கு ₹{price}. அடுத்த 15 நாட்களில் ₹{pred} ஆக இருக்கும் என கணிக்கப்பட்டுள்ளது.",
        "te": "{crop} ప్రస్తుత మార్కెట్ ధర క్వింటాల్‌కు ₹{price}. రాబోయే 15 రోజుల్లో ₹{pred} వరకు వెళ్తుందని అంచనా.",
        "kn": "{crop} ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ದರ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹{price}. ಮುಂದಿನ 15 ದಿನಗಳಲ್ಲಿ ₹{pred} ತಲುಪುವ ನಿರೀಕ್ಷೆಯಿದೆ.",
        "ml": "{crop} ന്റെ നിലവിലെ വിപണി വില ക്വിന്റലിന് ₹{price}. അടുത്ത 15 ദിവസത്തിനുള്ളിൽ ₹{pred} ആകുമെന്ന് കണക്കാക്കുന്നു.",
        "or": "{crop} ର ବର୍ତ୍ତମାନ ବଜାର ଦର କ୍ୱିଣ୍ଟାଲ ପିଛା ₹{price}। ଆଗାମୀ 15 ଦିନ ମଧ୍ୟରେ ଏହା ₹{pred} ହେବାର ଆକଳନ।",
        "as": "{crop} ৰ বৰ্তমান বজাৰ মূল্য কুইন্টলত ₹{price}। আগন্তুক ১৫ দিনত ই ₹{pred} হোৱাৰ সম্ভাৱনা আছে।"
    },
    "disease": {
        "en": "To diagnose crop disease, upload a clear photo of the infected leaf in the Crop Disease Detection module. For tomato blight, common symptoms are dark target spots and leaf yellowing, treatable with copper oxychloride or Mancozeb.",
        "hi": "फसल रोग की पहचान के लिए 'रोग पहचान' मॉड्यूल में पत्ती की तस्वीर अपलोड करें। टमाटर के झुलसा रोग में पत्तियों पर गोल भूरे धब्बे पड़ते हैं, जिसे कॉपर ऑक्सीक्लोराइड या मैंकोजेब से रोका जा सकता है।",
        "pa": "ਫ਼ਸਲ ਦੀ ਬਿਮਾਰੀ ਦੀ ਜਾਂਚ ਲਈ ਪੱਤੇ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ। ਟਮਾਟਰ ਝੁਲਸ ਰੋਗ ਲਈ ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ ਜਾਂ ਮੈਨਕੋਜ਼ੇਬ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।",
        "bn": "ফসলের রোগ নির্ণয়ের জন্য আক্রান্ত পাতার একটি ছবি আপলোড করুন। টমেটোর ব্লাইট রোগের জন্য ম্যানকোজেব স্প্রে করুন।",
        "mr": "पिकांच्या रोगाचे निदान करण्यासाठी पानाचा फोटो अपलोड करा. टोमॅटोवरील करपा रोगासाठी कॉपर ऑक्सिक्लोराईड किंवा मॅन्कोझेबची फवारणी करा.",
        "gu": "પાકના રોગની ઓળખ માટે પાંદડાનો ફોટો અપલોડ કરો. ટામેટાના સુકારા રોગ માટે મેન્કોઝેબનો છંટકાવ કરો.",
        "ta": "பயிர் நோயை கண்டறிய பாதிக்கப்பட்ட இலையின் புகைப்படத்தை பதிவேற்றவும். தக்காளியில் கருகல் நோய்க்கு மாங்கோசெப் தெளிக்கவும்.",
        "te": "పంట తెగులును గుర్తించడానికి ఆకు ఫోటోను అప్‌లోడ్ చేయండి. టమోటా ఎండు తెగులు నివారణకు మాంకోజెబ్ స్ప్రే చేయండి.",
        "kn": "ಬೆಳೆ ರೋಗ ಪತ್ತೆಹಚ್ಚಲು ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಟೊಮೆಟೊ ರೋಗಕ್ಕೆ ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.",
        "ml": "വിളകളുടെ രോഗനിർണ്ണയത്തിന് ഇലയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക. തക്കാളിയിലെ വാട്ടരോഗത്തിന് മാങ്കോസെബ് തളിക്കുക.",
        "or": "ଫସଲ ରୋଗ ନିରୂପଣ ପାଇଁ ପତ୍ରର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ। ଟମାଟୋ ଝାଉଁଳା ରୋଗ ପାଇଁ ମାଙ୍କୋଜେବ ସ୍ପ୍ରେ କରନ୍ତୁ।",
        "as": "শস্যৰ ৰোগ নিৰ্ণয়ৰ বাবে পাতৰ ছবি আপলোড কৰক। বিলাহীৰ ব্লাইট ৰোগৰ বাবে মেনকোজোব ব্যৱহাৰ কৰক।"
    },
    "fertilizer": {
        "en": "For optimal wheat yields, the standard requirement is 120 kg Nitrogen, 60 kg Phosphorus, and 40 kg Potassium per hectare. Apply DAP and MOP as basal dose, followed by split Urea during tillering.",
        "hi": "गेहूं के बेहतर उत्पादन के लिए प्रति हेक्टेयर 120 किग्रा नाइट्रोजन, 60 किग्रा फास्फोरस और 40 किग्रा पोटाश की आवश्यकता होती है। बुवाई के समय डीएपी और पोटाश डालें तथा कल्ले फूटते समय यूरिया दें।",
        "pa": "ਕਣਕ ਦੀ ਵਧੀਆ ਪੈਦਾਵਾਰ ਲਈ ਬਿਜਾਈ ਸਮੇਂ ਡੀਏਪੀ ਅਤੇ ਪੋਟਾਸ਼ ਪਾਓ, ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਯੂਰੀਆ ਦੀਆਂ ਕਿਸ਼ਤਾਂ ਦਿਓ।",
        "bn": "গমের ভালো ফলনের জন্য ডিএপি এবং পটাশ জমিতে দিন এবং পরে ইউরিয়া প্রয়োগ করুন।",
        "mr": "गव्हाच्या चांगल्या उत्पादनासाठी पेरणीच्या वेळी डीएपी आणि पोटॅश द्या आणि नंतर युरियाचा हप्ता द्या.",
        "gu": "ઘઉંના સારા ઉત્પાદન માટે વાવણી વખતે ડીએપી અને પોટાશ આપો અને પછી યુરિયા આપો.",
        "ta": "கோதுமை நல்ல மகசூல் பெற டிஏபி மற்றும் பொட்டாஷ் அடியுரமாக இட்டு, பின்னர் யூரியா இடவும்.",
        "te": "గోధుమ మంచి దిగుబడి కోసం విత్తే సమయంలో డిఎపి మరియు పొటాష్ వేసి, తరువాత యూరియా వేయండి.",
        "kn": "ಗೋಧಿ ಉತ್ತಮ ಇಳುವರಿಗಾಗಿ ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ ಡಿಎಪಿ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಹಾಕಿ, ನಂತರ ಯೂರಿಯಾ ನೀಡಿ.",
        "ml": "ഗോതമ്പിന്റെ മികച്ച വിളവിന് ഡിഎപിയും പൊട്ടാഷും അടിവളമായി നൽകി പിന്നീട് യൂറിയ നൽകുക.",
        "or": "ଗହମ ଭଲ ଅମଳ ପାଇଁ ବୁଣିବା ସମୟରେ ଡିଏପି ଓ ପୋଟାଶ ଦିଅନ୍ତୁ ଏବଂ ପରେ ୟୁରିଆ ପ୍ରୟୋଗ କରନ୍ତୁ।",
        "as": "ঘেঁহুৰ ভাল উৎপাদনৰ বাবে ডিএপি আৰু পটাশ প্ৰয়োগ কৰক আৰু পাছত ইউৰিয়া দিয়ক।"
    },
    "schemes": {
        "en": "Key government schemes include PM-KISAN (₹6,000/year income support), PM Fasal Bima Yojana (comprehensive crop insurance at just 1.5-2% premium), and Kisan Credit Card (4% crop loans). Check the Government Schemes module for direct application links.",
        "hi": "प्रमुख सरकारी योजनाओं में पीएम-किसान (₹6,000 वार्षिक सहायता), पीएम फसल बीमा योजना (कम प्रीमियम पर फसल सुरक्षा), और किसान क्रेडिट कार्ड (4% ब्याज पर ऋण) शामिल हैं। विस्तृत जानकारी के लिए 'सरकारी योजनाएं' टैब देखें।",
        "pa": "ਮੁੱਖ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਵਿੱਚ ਪੀਐਮ-ਕਿਸਾਨ (₹6,000 ਸਾਲਾਨਾ), ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ ਅਤੇ ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਸ਼ਾਮਲ ਹਨ।",
        "bn": "প্রধান সরকারি প্রকল্পগুলির মধ্যে রয়েছে পিএম-কিসান (বার্ষিক ₹৬,০০০), ফসল বীমা যোজনা এবং কিষাণ ক্রেডিট কার্ড।",
        "mr": "मुख्य सरकारी योजनांमध्ये पीएम-किसान (वार्षिक ₹६,०००), पीक विमा योजना आणि किसान क्रेडिट कार्डचा समावेश आहे.",
        "gu": "મુખ્ય સરકારી યોજનાઓમાં પીએમ-કિસાન (વાર્ષિક ₹6,000), પાક વીમા યોજના અને કિસાન ક્રેડિટ કાર્ડનો સમાવેશ થાય છે.",
        "ta": "முக்கிய அரசு திட்டங்களில் பிஎம்-கிசான் (ஆண்டுக்கு ₹6,000), பயிர் காப்பீட்டுத் திட்டம் மற்றும் கிசான் கிரெடிட் கார்டு அடங்கும்.",
        "te": "ప్రధాన ప్రభుత్వ పథకాలలో పిఎం-కిసాన్ (సంవత్సరానికి ₹6,000), పంటల బీమా పథకం మరియు కిసాన్ క్రెడిట్ కార్డ్ ఉన్నాయి.",
        "kn": "ಪ್ರಮುಖ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಲ್ಲಿ ಪಿಎಂ-ಕಿಸಾನ್ (ವರ್ಷಕ್ಕೆ ₹6,000), ಬೆಳೆ ವಿಮೆ ಮತ್ತು ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸೇರಿವೆ.",
        "ml": "പ്രധാന സർക്കാർ പദ്ധതികളിൽ പിഎം-കിസാൻ (പ്രതിവർഷം ₹6,000), വിള ഇൻഷുറൻസ്, കിസാൻ ക്രെഡിറ്റ് കാർഡ് എന്നിവ ഉൾപ്പെടുന്നു.",
        "or": "ମୁଖ୍ୟ ସରକାରୀ ଯୋଜନାରେ ପିଏମ-କିଷାନ (ବାର୍ଷିକ ₹6,000), ଫସଲ ବୀମା ଯୋଜନା ଓ କିଷାନ କ୍ରେଡିଟ କାର୍ଡ ଅନ୍ତର୍ଭୁକ୍ତ।",
        "as": "প্ৰধান চৰকাৰী আঁচনিবোৰৰ ভিতৰত পিএম-কিষাণ (বছৰি ₹৬,০০০), শস্য বীমা আৰু কিষাণ ক্ৰেডিট কাৰ্ড অন্তৰ্ভুক্ত।"
    },
    "general": {
        "en": "I am AgriNova AI, your Smart Agriculture Assistant. You can ask me about live weather, crop leaf disease diagnosis, scientific fertilizer dosages, mandi market prices, and government subsidy schemes in 12 Indian languages.",
        "hi": "मैं एग्रीनोवा एआई हूँ, आपका स्मार्ट कृषि सहायक। आप मुझसे मौसम, फसल रोग पहचान, खाद की सही मात्रा, मंडी भाव और सरकारी योजनाओं के बारे में 12 भाषाओं में पूछ सकते हैं।",
        "pa": "ਮੈਂ ਐਗਰੀਨੋਵਾ ਏਆਈ ਹਾਂ। ਤੁਸੀਂ ਮੇਰੇ ਤੋਂ ਮੌਸਮ, ਫ਼ਸਲ ਦੇ ਰੋਗ, ਖਾਦ, ਮੰਡੀ ਭਾਅ ਅਤੇ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
        "bn": "আমি এগ্রিনোভা এআই। আপনি আমার কাছে আবহাওয়া, ফসলের রোগ, সার, বাজারের দর এবং সরকারি প্রকল্প সম্পর্কে জানতে পারেন।",
        "mr": "मी अग्रीनोव्हा एआय आहे. आपण मला हवामान, पीक रोग, खते, बाजारभाव आणि सरकारी योजनांबद्दल विचारू शकता.",
        "gu": "હું એગ્રીનોવા AI છું. તમે મને હવામાન, પાકના રોગો, ખાતર, બજાર ભાવ અને સરકારી યોજનાઓ વિશે પૂછી શકો છો.",
        "ta": "நான் அக்ரிநோவா AI. வானிலை, பயிர் நோய், உரம், சந்தை விலை மற்றும் அரசு திட்டங்கள் பற்றி என்னிடம் கேட்கலாம்.",
        "te": "నేను అగ్రినోవా AI. వాతావરણం, పంట తెగుళ్లు, ఎరువులు, మార్కెట్ ధరలు మరియు ప్రభుత్వ పథకాల గురించి నన్ను అడగవచ్చు.",
        "kn": "ನಾನು ಅಗ್ರಿನೋವಾ ಎಐ. ಹವಾಮಾನ, ಬೆಳೆ ರೋಗ, ಗೊಬ್ಬರ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ನೀವು ಕೇಳಬಹುದು.",
        "ml": "ഞാൻ അഗ്രിനോവ AI. കാലാവസ്ഥ, വിള രോഗങ്ങൾ, വളം, വിപണി വില, സർക്കാർ പദ്ധതികൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.",
        "or": "ମୁଁ ଏଗ୍ରିନୋଭା AI। ଆପଣ ପାଗ, ଫସଲ ରୋଗ, ଖତ-ସାର, ବଜାର ଦର ଓ ସରକାରୀ ଯୋଜନା ବିଷୟରେ ପଚାରିପାରିବେ।",
        "as": "মই এগ্ৰিনোভা এআই। আপুনি বতৰ, শস্যৰ ৰোগ, সাৰ, বজাৰ মূল্য আৰু চৰকাৰী আঁচনি সম্পৰ্কে সুধিব পাৰে।"
    }
}

def parse_farmer_query(text, lang="en"):
    """
    Detect user query intent and extract contextual entities
    """
    query_lower = text.lower()

    # Weather Intent Keywords across English, Hindi, Punjabi, etc.
    weather_keywords = ["weather", "rain", "temperature", "forecast", "barish", "mausam", "तापमान", "मौसम", "बारिश", "ਬਰਸਾਤ", "ਮੀਂਹ", "আবহাওয়া", "বৃষ্টি", "हवामान", "पाऊस", "હવામાન", "વરસાદ", "வானிலை", "மழை", "వాతావరణం", "వర్షం", "ಹವಾಮಾನ", "ಮಳೆ", "കാലാവസ്ഥ", "മഴ", "ପାଗ", "ବର୍ଷା", "বতৰ", "বৰষুণ"]
    if any(k in query_lower for k in weather_keywords):
        # Search any district in India from query
        matched_dist = None
        for word in query_lower.replace("?", "").replace(",", "").split():
            if len(word) >= 4:
                match = find_district_by_name(word)
                if match:
                    matched_dist = match
                    break

        if matched_dist:
            city = matched_dist["district"]
            state = matched_dist["state"]
            w_data = compute_accurate_agro_weather(city, state, matched_dist["lat"], matched_dist["lon"], matched_dist["zone"])
        else:
            city = "Ludhiana"
            state = "Punjab"
            w_data = compute_accurate_agro_weather("Ludhiana", "Punjab", 30.90, 75.86, "PAU Agricultural Epicenter")

        temp = w_data["current"]["temperature"]
        cond = w_data["current"]["condition"]
        rain = w_data["current"]["rain_prob"]
        adv = w_data["advisories"][0]["desc"] if w_data["advisories"] else "Follow normal irrigation."

        template = TRANSLATED_RESPONSES["weather"].get(lang, TRANSLATED_RESPONSES["weather"]["en"])
        resp_text = template.format(city=f"{city} ({state})", temp=temp, condition=cond, rain_prob=rain, advisory=adv)

        return {
            "intent": "weather",
            "module": "weather",
            "response": resp_text,
            "data": {
                "city": city,
                "state": state,
                "temp": temp,
                "condition": cond,
                "rain_prob": rain
            },
            "action_link": "#weather"
        }

    # Market Price Intent Keywords
    market_keywords = ["price", "rate", "mandi", "bhav", "market", "cost", "दाम", "भाव", "मंडी", "ਭਾਅ", "ਮੰਡੀ", "দর", "বাজার", "बाजारभाव", "भाव", "બજાર", "விலை", "சந்தை", "ధర", "మార్కెట్", "ಬೆಲೆ", "ಮಾರುಕಟ್ಟೆ", "വില", "വിപണി", "ଦର", "ବଜାର", "মূল্য", "বজাৰ"]
    if any(k in query_lower for k in market_keywords):
        # Identify crop
        crop = "Wheat"
        for cr in ["wheat", "rice", "paddy", "potato", "onion", "tomato", "cotton", "mustard", "soybean", "maize", "gram", "turmeric"]:
            if cr in query_lower:
                crop = cr.title()
                if crop == "Paddy":
                    crop = "Paddy (Rice)"
                break
        if "आलू" in text or "potato" in query_lower: crop = "Potato"
        elif "टमाटर" in text or "tomato" in query_lower: crop = "Tomato"
        elif "प्याज" in text or "onion" in query_lower: crop = "Onion"
        elif "गेहूं" in text or "wheat" in query_lower: crop = "Wheat"

        base_modal = COMMODITY_BASELINES.get(crop, COMMODITY_BASELINES["Wheat"])["modal_base"]
        forecast = train_and_forecast_prices(crop, base_modal, 15)

        template = TRANSLATED_RESPONSES["market"].get(lang, TRANSLATED_RESPONSES["market"]["en"])
        resp_text = template.format(crop=crop, price=int(base_modal), trend=forecast["trend_direction"], pred=int(forecast["predicted_future_price"]))

        return {
            "intent": "market_price",
            "module": "market",
            "response": resp_text,
            "data": {
                "crop": crop,
                "current_price": base_modal,
                "predicted_price": forecast["predicted_future_price"],
                "trend": forecast["trend_direction"]
            },
            "action_link": "#market"
        }

    # Disease Detection Intent Keywords
    disease_keywords = ["disease", "pest", "leaf", "blight", "spots", "sick", "fungus", "rog", "bimari", "रोग", "बीमारी", "झुलसा", "पत्ती", "ਬਿਮਾਰੀ", "রোগ", "रोग", "રોગ", "நோய்", "తెగులు", "ರೋಗ", "രോഗം", "ରୋଗ", "ৰোগ"]
    if any(k in query_lower for k in disease_keywords):
        template = TRANSLATED_RESPONSES["disease"].get(lang, TRANSLATED_RESPONSES["disease"]["en"])
        return {
            "intent": "crop_disease",
            "module": "disease",
            "response": template,
            "data": {"suggested_module": "AI Crop Disease Detection"},
            "action_link": "#disease"
        }

    # Fertilizer Intent Keywords
    fertilizer_keywords = ["fertilizer", "urea", "dap", "potash", "manure", "npk", "khad", "उर्वरक", "खाद", "यूरिया", "ਡੀਏਪੀ", "ਯੂਰੀਆ", "সার", "खत", "ખાતર", "உரம்", "ఎరువు", "ಗೊಬ್ಬರ", "വളം", "ସାର", "সাৰ"]
    if any(k in query_lower for k in fertilizer_keywords):
        template = TRANSLATED_RESPONSES["fertilizer"].get(lang, TRANSLATED_RESPONSES["fertilizer"]["en"])
        return {
            "intent": "fertilizer",
            "module": "fertilizer",
            "response": template,
            "data": {"suggested_module": "AI Fertilizer Recommendation"},
            "action_link": "#fertilizer"
        }

    # Government Schemes Intent Keywords
    scheme_keywords = ["scheme", "subsidy", "yojana", "pm kisan", "insurance", "loan", "kcc", "योजना", "सब्सिडी", "पीएम किसान", "ਸਕੀਮ", "ਪੀਐਮ", "প্রকল্প", "योजना", "યોજના", "திட்டம்", "పథకం", "ಯೋಜನೆ", "പദ്ധതി", "ଯୋଜନା", "আঁচনি"]
    if any(k in query_lower for k in scheme_keywords):
        template = TRANSLATED_RESPONSES["schemes"].get(lang, TRANSLATED_RESPONSES["schemes"]["en"])
        return {
            "intent": "government_schemes",
            "module": "schemes",
            "response": template,
            "data": {"suggested_module": "Government Schemes & Benefits"},
            "action_link": "#schemes"
        }

    # Default general assistance
    template = TRANSLATED_RESPONSES["general"].get(lang, TRANSLATED_RESPONSES["general"]["en"])
    return {
        "intent": "general",
        "module": "dashboard",
        "response": template,
        "data": {},
        "action_link": "#dashboard"
    }

@voice_bp.route("/query", methods=["POST"])
def voice_query():
    data = request.get_json() or {}
    text = data.get("text", "").strip()
    language = data.get("language", "en")

    if not text:
        return jsonify({"success": False, "error": "No query text provided"}), 400

    result = parse_farmer_query(text, language)
    result["success"] = True
    result["received_query"] = text
    result["language"] = language

    return jsonify(result)
