import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from "../../services/api"; 

export default function Denuncia({ navigation, route }) {
  // Pega o userId e a flag isAgente enviados pela Home correspondente
  const userId = route?.params?.userId;
  const isAgente = route?.params?.isAgente; 

  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState(null); 
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "We need camera permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!category || !address || urgency === null) {
      Alert.alert("Error", "Please fill category, address and urgency.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User not identified. Please log in again.");
      return;
    }

    const formData = new FormData();

    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('Photo', {
        uri: image,
        name: filename,
        type: type,
      });
    }

    formData.append('Category', category);
    formData.append('LocalAddress', address);
    formData.append('Urgency', urgency); 
    formData.append('AdditionalInfo', description);
    formData.append('UserId', userId);

    try {
      setLoading(true);
      
      const response = await api.post("/api/Denuncias", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Your report has been submitted!", [
          {
            text: "OK",
            onPress: () => {
              // Se for agente, volta para HomeAgente. Se não, volta para Home.
              if (isAgente) {
                navigation.navigate('HomeAgente', { userId: userId });
              } else {
                navigation.navigate('Home', { userId: userId });
              }
            }
          }
        ]);
      }
    } catch (error) {
      console.log("Submit error:", error);
      Alert.alert("Error", "Could not send report. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => isAgente ? navigation.navigate('HomeAgente', { userId }) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={true} showsVerticalScrollIndicator={false}>
        <View style={styles.yellowHeader}>
          <View style={styles.headerContent}>
            <Image 
              source={require('../../assets/denuncia.png')} 
              style={styles.iconImage} 
              resizeMode="contain" 
            />
            <Text style={styles.headerText}>
              Fill all the blank{"\n"}options to submit{"\n"}your report
            </Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Please submit a photo</Text>
          <View style={styles.photoSection}>
            <View style={styles.photoButtons}>
              <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
                <Text style={styles.photoBtnText}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
                <Text style={styles.photoBtnText}>Upload from device</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.photoPlaceholder}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <Ionicons name="camera-outline" size={45} color="#CCC" />
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Please indicate the category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(val) => setCategory(val)}
                dropdownIconColor="#444"
              >
                <Picker.Item label="Category..." value="" color="#A0A0A0" />
                <Picker.Item label="Arboviroses" value="arboviroses" />
                <Picker.Item label="Sanitation" value="sanitation" />
                <Picker.Item label="Arthropods" value="artropodes" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Please indicate the local address</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input} 
                value={address}
                onChangeText={setAddress}
                placeholder="Street name, number..."
              />
            </View>
          </View>

          <View style={styles.mapContainer}>
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: -23.5612,
                longitude: -46.6559,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker coordinate={{ latitude: -23.5612, longitude: -46.6559 }} />
            </MapView>
          </View>

          <Text style={styles.label}>Please indicate the urgency level</Text>
          
          <TouchableOpacity 
            style={[styles.urgencyBtn, { borderColor: '#FFBABA' }, urgency === 2 && { backgroundColor: '#FFBABA' }]}
            onPress={() => setUrgency(2)}
          >
            <Text style={styles.urgencyText}>High (with larvae or insects)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.urgencyBtn, { borderColor: '#C7E5C7' }, urgency === 1 && { backgroundColor: '#C7E5C7' }]}
            onPress={() => setUrgency(1)}
          >
            <Text style={styles.urgencyText}>Medium (presents danger)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.urgencyBtn, { borderColor: '#D1E8FF' }, urgency === 0 && { backgroundColor: '#D1E8FF' }]}
            onPress={() => setUrgency(0)}
          >
            <Text style={styles.urgencyText}>Low (potential problem)</Text>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Other important information</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <TextInput 
                style={styles.textArea} 
                placeholder="Max. 1000 characters..." 
                multiline 
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && { backgroundColor: '#ccc' }]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FF751F" />
            ) : (
              <Text style={styles.submitBtnText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topNav: { 
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  scrollContent: { paddingBottom: 50 },
  yellowHeader: { 
    backgroundColor: '#FFDE59', 
    height: 280, 
    justifyContent: 'center', 
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconImage: { 
    width: 110, 
    height: 110,
  },
  headerText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#FF751F', 
    lineHeight: 28, 
    textAlign: 'right', 
    flex: 1,
  },
  formContainer: { 
    flex: 1, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50, 
    marginTop: -50, 
    paddingHorizontal: 25, 
    paddingTop: 45, 
    minHeight: 800,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10, marginTop: 15 },
  photoSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  photoButtons: { width: '58%' },
  photoBtn: { borderWidth: 1, borderColor: '#444', borderRadius: 15, paddingVertical: 10, marginBottom: 12, alignItems: 'center' },
  photoBtnText: { fontSize: 13, color: '#333', fontWeight: '500' },
  photoPlaceholder: { 
    width: 120, 
    height: 120, 
    borderWidth: 1, 
    borderColor: '#444', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  previewImage: { width: '100%', height: '100%' },
  pickerWrapper: { borderWidth: 1.2, borderColor: '#444', borderRadius: 12, height: 55, justifyContent: 'center' },
  inputWrapper: { borderWidth: 1.2, borderColor: '#444', borderRadius: 12, height: 55, paddingHorizontal: 15, justifyContent: 'center' },
  input: { fontSize: 16, color: '#000', flex: 1 },
  mapContainer: { height: 160, borderRadius: 15, overflow: 'hidden', marginTop: 20, borderWidth: 1, borderColor: '#444' },
  map: { ...StyleSheet.absoluteFillObject },
  urgencyBtn: { borderWidth: 1.5, borderRadius: 15, padding: 12, marginBottom: 10, alignItems: 'center' },
  urgencyText: { fontSize: 14, fontWeight: '500', color: '#333' },
  textAreaWrapper: { height: 120, alignItems: 'flex-start', paddingTop: 10 },
  textArea: { fontSize: 16, textAlignVertical: 'top', width: '100%' },
  submitButton: { backgroundColor: '#FFDE59', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 30, width: '85%', alignSelf: 'center' },
  submitBtnText: { color: '#FF751F', fontWeight: 'bold', fontSize: 18 }
});