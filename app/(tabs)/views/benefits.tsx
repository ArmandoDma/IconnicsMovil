import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1169&auto=format&fit=crop",
    title: "Exclusive Member Benefits",
    desc: "Unlock rewards, discounts and personalized perks.",
  },
  {
    img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1920",
    title: "Stay Motivated",
    desc: "Track progress and earn health achievements.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1728566737814-bac7f3353154?q=80&w=1170&auto=format&fit=crop",
    title: "Rewards For Consistency",
    desc: "Daily challenges that give real-life benefits.",
  },
];

const benefits = [
  { icon: "barbell", title: "Gym Discounts", desc: "Save up to 30% in partnered gyms for staying active." },
  { icon: "pricetags", title: "Exclusive Coupons", desc: "Weekly discount codes for nutrition stores and cafés." },
  { icon: "gift", title: "Reward Points", desc: "Earn points for daily steps and exchange for perks." },
  { icon: "bicycle", title: "Challenges Access", desc: "Join health challenges and unlock achievement badges." },
  { icon: "heart", title: "Wellness Tips", desc: "Receive curated health advice based on your metrics." },
  { icon: "storefront", title: "Partner Stores", desc: "Special deals in fitness and wellness product stores." },
];

export default function BenefitsSection() {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      setIndex(nextIndex);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {slides.map((slide, i) => (
          <View key={i} style={styles.slide}>
            <Image source={{ uri: slide.img }} style={styles.slideImage} />
            <View style={styles.slideText}>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideDesc}>{slide.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>


      {/* Benefits Grid */}
      <Text style={styles.sectionTitle}>Available Benefits</Text>
      <View style={styles.grid}>
        {benefits.map((item, index) => (
          <View key={index} style={styles.card}>
            <Ionicons name={item.icon} size={26} color="#1665f8" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "600",
    color: "#2b2b2b",
  },
  carousel: {
    width: "100%",
    height: 350,
    borderRadius: 16,
    marginBottom: 35,
  },
  slide: {
    width: width - 40,
    height: 350,
    backgroundColor: '#ffed34',
    borderRadius: 16,
    overflow: "hidden",
  },
  slideImage: {
    width,
    height: "100%",
    resizeMode: "cover",
  },
  slideText: {
    position: "absolute",
    bottom: 20,
    left: 10,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  slideDesc: {
    fontSize: 14,
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (width - 60) / 2,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 3,
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});