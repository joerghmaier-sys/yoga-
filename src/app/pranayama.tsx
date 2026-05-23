import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { PRANAYAMA_EXERCISES } from '@/data/yoga';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  exerciseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  exerciseCardExpanded: {
    backgroundColor: '#333',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  germanName: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 12,
    lineHeight: 20,
  },
  duration: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  pattern: {
    fontSize: 12,
    color: '#4a9eff',
    fontWeight: '600',
    marginBottom: 12,
  },
  detailSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ff6b35',
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
    paddingLeft: 8,
  },
  instructionItem: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 6,
    paddingLeft: 8,
    lineHeight: 18,
  },
  startButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default function PranayamaScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Pranayama</Text>
          <Text style={styles.subtitle}>Atemtechniken für Körper und Geist</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            {PRANAYAMA_EXERCISES.map(exercise => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => toggleExpand(exercise.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.exerciseCard,
                    expandedId === exercise.id && styles.exerciseCardExpanded,
                  ]}
                >
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.germanName}>{exercise.germanName}</Text>
                  <Text style={styles.description}>{exercise.description}</Text>
                  <Text style={styles.duration}>Dauer: {exercise.duration} Minuten</Text>
                  <Text style={styles.pattern}>Atemrhythmus: {exercise.breathingPattern}</Text>

                  {expandedId === exercise.id && (
                    <>
                      <View style={styles.detailSection}>
                        <Text style={styles.sectionTitle}>Vorteile:</Text>
                        {exercise.benefits.map((benefit, idx) => (
                          <Text key={idx} style={styles.benefitItem}>
                            • {benefit}
                          </Text>
                        ))}
                      </View>

                      <View style={styles.detailSection}>
                        <Text style={styles.sectionTitle}>Anleitung:</Text>
                        {exercise.instructions.map((instruction, idx) => (
                          <Text key={idx} style={styles.instructionItem}>
                            {idx + 1}. {instruction}
                          </Text>
                        ))}
                      </View>

                      <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startButtonText}>Üben starten</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
