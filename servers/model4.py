import urllib.request
import base64
import json
import os
import ssl
import spacy
from flask import Flask
from flask import Flask,jsonify
from flask import request
from flask_cors import CORS
import nltk
import string
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import language_tool_python

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
# Load NLP models and libraries
nlp = spacy.load("en_core_web_sm")
sia = SentimentIntensityAnalyzer()
tool = language_tool_python.LanguageTool('en-US')
tfidf_vectorizer = TfidfVectorizer()

nltk.download('stopwords')
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app)
def allowSelfSignedHttps(allowed):
    # bypass the server certificate verification on client side
    if allowed and not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
        ssl._create_default_https_context = ssl._create_unverified_context

allowSelfSignedHttps(True) # this line is needed if you use self-signed certificate in your scoring service.

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'

@app.route('/evaluateScore', methods=['POST'])
def evaluate_score():
    data=request.get_json()
    student_score={}
    original_answers = data.get('profanswers', {})
    student_answers = data.get('useranswers', [])
    # print(type(original_answers))
    # print(original_answers['script']['0'][0:50])
    # print(type(student_answers))
    final_result={}
    for eachstudent in student_answers:
        
        # print(eachstudent)
        # print(type(eachstudent))
        for key in eachstudent["script"]:
            # print("Answer ",key)
            # print(eachstudent["script"][key])
            sturesponse=preprocess_text(eachstudent["script"][key])
            profresponse=preprocess_text(original_answers['script'][key])
            # print(sturesponse)
            tfidf_matrix = tfidf_vectorizer.fit_transform([sturesponse])
            # Calculating the cosine similarity between student responses and the correct answer
            cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_vectorizer.transform([profresponse]))
            # print(cosine_similarities[0][0])
            # Sentiment Analysis
            sentiment_score = sia.polarity_scores(sturesponse)
            # sentiment_scores.append(sentiment_score)
        
            # Grammar and Spelling Check
            grammar_errors = len(tool.check(sturesponse))
            # grammar_scores.append(len(grammar_errors))
        
            # Dependency Parsing for Complexity
            doc = nlp(sturesponse)
            complexity_score = len(list(doc.sents))
            # topic_scores.append(complexity_score)
            # Custom Scoring based on Rubrics
            custom_score = custom_scoring_function(sturesponse)
            print(cosine_similarities[0][0])
            print(sentiment_score["compound"])
            # print(grammar_errors) 
            # print(complexity_score)  
            # print(custom_score)
            
            # custom_scores.append(custom_score)
            # total_avg_score=(cosine_similarities[0][0]*100+sentiment_score["compound"]*100-grammar_errors -complexity_score + custom_score)/5.0
            total_avg_score=cosine_similarities[0][0]*100
            final_result.setdefault(eachstudent["username"], {})
            final_result[eachstudent["username"]].setdefault(key, total_avg_score)
            final_result[eachstudent["username"]][key]=total_avg_score
    
    print(final_result) 


        
    # print()
    return jsonify(final_result)

# Define a function for text preprocessing
def preprocess_text(text):
    # Convert text to lowercase
    text = text.lower()

    # Remove punctuation
    text = ''.join([char for char in text if char not in string.punctuation])

    # Tokenize the text into words
    words = text.split()

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]

    # Join the processed words back into a cleaned text
    cleaned_text = ' '.join(words)

    return cleaned_text


# Define a simple custom scoring function (you need to customize this based on your rubrics)
def custom_scoring_function(text):
    # Example: Assign a score based on the length of the text
    return len(text.split())


# Define a simple feedback and scoring function (you need to customize this based on your rubrics)
def generate_feedback_and_score(sentiment, grammar, complexity, custom, similarity, extracted_text):
    # Example: Provide feedback based on sentiment score
    feedback = f"Sentiment: {sentiment['compound']}\n"
    if sentiment['compound'] >= 0.1:
        feedback += "Positive sentiment\n"
    else:
        feedback += "Negative sentiment\n"

    # Calculate an overall score (you need to customize this based on your weighting)
    overall_score = (sentiment['compound'] + grammar - complexity + custom + similarity) / 5.0

    return feedback, overall_score

# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'
text='''"Key-value stores:\n→ The simplest type of\nshore.\n→ Use cases\nelement\nin\na key value\npair consisting.\nconsisting of\n\"key\") and\nvalue.\nIn\nlike\nrelational database.\nkey, or\nattribute\n(such as \"alaska\")\ninclude\nuser\nEvery data\n|Key :)\nto\nprofiles\nID: 210\nKey:2 ID: 411\nRatha than\nstored in\ncolumns.\ncan\nBut still\nother\n→ Examples are\nColumn-Oriented databases:\neach\naverage etc).\nMD) oldetpil JOSTA\nstoring\nTO\nname (such\nThey store a louse amount\nformat and\ntitles of\nanother.\nEvery\nNO2000\ncells\nUse-\nNosal\ndata\nEmail: wick@gmail.com)\nSAN AND\na\nindividual\nwhich\nColumn- oriented databases\nof\ncolumn\nthe\nindividual\nDidalal Longstal on\nshopping carts, use preferences, and\ncolumn\nmontuotab Joust\nгнози\nDynamo, Redis, Riak, Oracle BDB Berkely DB\ndatabases\nsense\nwith only\ncolumns: the\nas \"state\") and the value\nLA\nkey-value\nthe database is stored as\nattribute\nan\ncolumn\ncolumn like\nquickly aggregate value of\ncases include\nname (or\na key-value store is\nare\n2\nare\nز ورود\nmay\ntraditional databaje\nMODTC sphalwand\nrelational hiples\ntreated\nthe data is\nwitsgorgaISA {fo)\nfurther\ninto\n21892\ngrouped\nwork only on column.\nMph\ndata\ninto\n1\ncan diverse from one\nPosition n\nseparately.\ncolumn together.\nnow\ncontam multiple\nalpiz ar\nColumna databases\na siven column Cadding,\nanalytics.\nOny\nJ."''' 
# print(text)
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()






    # print(len(student_answers))
    # print(len(original_answers["answers"]['0']))
    # professor_script={}
    # for key in original_answers["answers"]:
    #     value=original_answers["answers"][key]
    #     print(key," >> ",len(value))
    #     print(type(value))
    #     answer=''
    #     for page in value:
    #         print(type(page))
    #         # image_buffer = Buffer.from(page, 'base64')  # Incorrect usage
    #         # Fix: Convert the base64 string to bytes using encode()
    #         image_buffer = base64.b64decode(page["buffer"])
    #         image_base64 = base64.b64encode(image_buffer).decode("utf-8")
    #         url="https://img-to-text-ten.vercel.app/text2"
    #         headers = {'Content-Type':'application/json; charset=utf-8'}
    #         body={"image":image_base64}
    #         json_data = json.dumps(body).encode('utf-8')
    #         req = urllib.request.Request(url, json_data, headers,method="POST")
    #         response = urllib.request.urlopen(req)
    #         result = response.read()
    #         # print(result.decode("utf-8").replace('\n',' '))
    #         answer=answer+result.decode("utf-8").replace('\\\n',' ')
    #     professor_script[key]=answer
    #     print(professor_script)