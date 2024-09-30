import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null); // Store selected image

  // Function to pick an image from the library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  const handlePostComment = () => {
    if (comment.trim() && rating > 0) {
      const newComment = {
        text: comment,
        rating: rating,
        image: image, // Add the selected image to the comment
      };
      setComments(prevComments => [...prevComments, newComment]);
      setComment(''); // Clear the input after posting
      setRating(0); // Reset the rating
      setImage(null); // Reset the image
    }
  };

  // Sort the comments from highest to lowest rating
  const sortedComments = comments.sort((a, b) => b.rating - a.rating);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= count ? 'star' : 'star-outline'}
            size={24}
            color={i <= count ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Review Section</Text>

      <FlatList
        data={sortedComments} // Use sorted comments
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <View style={styles.commentHeader}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? 'star' : 'star-outline'}
                  size={20}
                  color={i < item.rating ? '#FFD700' : '#ccc'}
                />
              ))}
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.commentImage} />
            )}
          </View>
        )}
      />

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rate the product:</Text>
        <View style={styles.stars}>{renderStars(rating)}</View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write a review..."
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TouchableOpacity onPress={handlePostComment} style={styles.postButton}>
        <Text style={styles.postButtonText}>Post Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
  },
  commentImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingContainer: {
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default Create;
