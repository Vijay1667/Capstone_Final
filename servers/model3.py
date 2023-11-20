from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Example texts
text1 = "This is the main document. \n It is important"
text2 = "This is also the imoprtant file. Keep it safe"

# Create a TF-IDF vectorizer
vectorizer = TfidfVectorizer()

# Fit and transform the text data
tfidf_matrix = vectorizer.fit_transform([text1, text2])

# Compute cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

print("Text 1:", text1)
print("Text 2:", text2)
print("\nTF-IDF Matrix:")
print(tfidf_matrix)
print("\nCosine Similarity Matrix:")
print(cosine_sim)
