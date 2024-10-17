import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePostComment = () => {
    if (comment.trim() && rating > 0 && category) {
      const newComment = {
        text: comment,
        rating: rating,
        category: category,
        image: image,
        date: new Date().toLocaleString(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setComment('');
      setRating(0);
      setCategory('');
      setImage(null);
    }
  };

  const handleDeleteComment = (index) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setComments(comments.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  const sortedComments = comments.sort((a, b) => b.rating - a.rating);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= count ? 'star' : 'star-outline'}
            size={24}
            color={i <= count ? '#FFD700' : '#555'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const categories = ['Taste', 'Quality', 'Service', 'Ambience'];

  return (
    <View style={styles.container}>
  
      <View style={styles.fixedHeader}>
        <Text style={styles.heading}>Review Section</Text>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Select a Category:</Text>
          <View style={styles.categories}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCategory(cat)}
                style={[styles.categoryButton, category === cat && styles.selectedCategory]}
              >
                <Text
                  style={[styles.categoryText, category === cat && styles.selectedCategoryText]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>


      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate the product:</Text>
          <View style={styles.stars}>{renderStars(rating)}</View>
        </View>

        <View style={styles.commentSection}>
          <TextInput
            style={styles.input}
            placeholder="Write a review..."
            placeholderTextColor="#888"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <Ionicons name="image" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePostComment} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post Review</Text>
        </TouchableOpacity>

        <FlatList
          data={sortedComments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.commentBox}>
      
              <View style={styles.commentHeader}>
                <Text style={styles.category}>Category: {item.category}</Text>
                <TouchableOpacity onPress={() => handleDeleteComment(index)} style={styles.deleteButton}>
                  <Ionicons name="trash" size={24} color="#ff4d4d" />
                </TouchableOpacity>
              </View>
              <View style={styles.ratingStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < item.rating ? 'star' : 'star-outline'}
                    size={20}
                    color={i < item.rating ? '#FFD700' : '#555'}
                  />
                ))}
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
       
              {item.image && <Image source={{ uri: item.image }} style={styles.commentImage} />}
              <Text style={styles.commentDate}>Posted on: {item.date}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffff', 
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#e0a15e',
  },
  categoryText: {
    color: '#aaa',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  ratingContainer: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20, 
    marginRight: 190,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  stars: {
    flexDirection: 'row',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#1f1f1f',
    color: '#fff',
    elevation: 1,
    marginRight: 10, 
    marginLeft: 19, 
  },
  uploadButton: {
    padding: 10, 
    borderRadius: 5,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentBox: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 5,
  },
  deleteButton: {
    padding: 5, 
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  commentImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  commentDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    color: '#b0ada7', 
},

});

export default Create;
