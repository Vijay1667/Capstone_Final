import cv2
import pytesseract
import spacy
from textblob import TextBlob
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import language_tool_python
from gensim import models
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import string
import nltk
from nltk.corpus import stopwords
from PIL import Image

# Load NLP models and libraries
nlp = spacy.load("en_core_web_sm")
sia = SentimentIntensityAnalyzer()
tool = language_tool_python.LanguageTool('en-US')
tfidf_vectorizer = TfidfVectorizer()

# Download NLTK's stopwords 
nltk.download('stopwords')


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


# Read the teacher's image and extract the correct answer text
teacher_image = cv2.imread("teacher_image.png")
im = Image.open("./test3.png")
teacher_correct_answer = pytesseract.image_to_string(im)
print(teacher_correct_answer)
# Initialize lists to store student responses and corresponding extracted text
student_responses = []
student_extracted_texts = []

# Read and preprocess student responses
for student_id in range(1, 61):
    # student_response_file = f"student_{student_id}.txt"
    student_image_file = f"student_{student_id}_image.png"

    # Read student response from text file
    # with open(student_response_file, "r", encoding="utf-8") as file:
    #     student_response = file.read()

    # Read student image and extract text using Tesseract OCR
    student_image = cv2.imread(student_image_file)
    extracted_text = pytesseract.image_to_string(student_image)

    # Preprocess the student response
    # student_response = preprocess_text(student_response)

    # Append the preprocessed student response and extracted text to lists
    # student_responses.append(student_response)
    student_extracted_texts.append(extracted_text)

# Initialize lists to store evaluation results
sentiment_scores = []
grammar_scores = []
topic_scores = []
custom_scores = []

# Iterate through student responses
for student_response in student_extracted_texts:
    # Sentiment Analysis
    sentiment_score = sia.polarity_scores(student_response)
    sentiment_scores.append(sentiment_score)

    # Grammar and Spelling Check
    grammar_errors = tool.check(student_response)
    grammar_scores.append(len(grammar_errors))

    # Dependency Parsing for Complexity
    doc = nlp(student_response)
    complexity_score = len(list(doc.sents))
    topic_scores.append(complexity_score)

    # Custom Scoring based on Rubrics
    custom_score = custom_scoring_function(student_response)
    custom_scores.append(custom_score)

# Calculating TF-IDF vectors for student responses
tfidf_matrix = tfidf_vectorizer.fit_transform(student_responses)

# Calculating the cosine similarity between student responses and the correct answer
cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_vectorizer.transform([teacher_correct_answer]))

# Generating feedback and scores for each student
for student_id, response in enumerate(student_extracted_texts, start=1):
    sentiment = sentiment_scores[student_id - 1]
    grammar = grammar_scores[student_id - 1]
    complexity = topic_scores[student_id - 1]
    custom = custom_scores[student_id - 1]
    similarity = cosine_similarities[student_id - 1][0]

    # Extracted text from student image
    extracted_text = student_extracted_texts[student_id - 1]

    # Generating feedback and scores based on the evaluation results
    feedback, score = generate_feedback_and_score(sentiment, grammar, complexity, custom, similarity, extracted_text)

    # Print or save the feedback and scores for each student
    print(f"Student {student_id}:")
    print("Sentiment Score:", sentiment)
    print("Grammar Score:", grammar)
    print("Complexity Score:", complexity)
    print("Custom Score:", custom)
    print("Similarity Score:", similarity)
    print("Extracted Text:", extracted_text)
    print("Feedback:", feedback)
    print("Overall Score:", score)
    print("\n")