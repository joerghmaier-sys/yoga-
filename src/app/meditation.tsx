import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { MEDITATIONS } from '@/data/yoga';

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
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  filterButtonActive: {
    backgroundColor: '#ff6b35',
    borderColor: '#ff6b35',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  meditationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4a9eff',
  },
  meditationCardExpanded: {
    backgroundColor: '#333',
  },
  meditationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  germanName: {
    fontSize: 14,
    color: '#4a9eff',
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
    marginBottom: 4,
  },
  level: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4a9eff',
  },
  detailSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  focusPoint: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  affirmation: {
    fontSize: 13,
    color: '#4a9eff',
    fontStyle: 'italic',
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#2a3a4a',
    borderLeftWidth: 3,
    borderLeftColor: '#4a9eff',
    borderRadius: 4,
  },
  startButton: {
    backgroundColor: '#4a9eff',
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

export default function MeditationScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredMeditations = selectedLevel
    ? MEDITATIONS.filter(m => m.level === selectedLevel)
    : MEDITATIONS;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Meditation</Text>
          <Text style={styles.subtitle}>Stille und innerer Frieden</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedLevel === null && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedLevel(null)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedLevel === null && styles.filterButtonTextActive,
                  ]}
                >
                  Alle
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedLevel === 'beginner' && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedLevel('beginner')}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedLevel === 'beginner' && styles.filterButtonTextActive,
                  ]}
                >
                  Anfänger
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedLevel === 'intermediate' && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedLevel('intermediate')}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedLevel === 'intermediate' && styles.filterButtonTextActive,
                  ]}
                >
                  Mittelstufe
                </Text>
              </TouchableOpacity>
            </View>

            {filteredMeditations.map(meditation => (
              <TouchableOpacity
                key={meditation.id}
                onPress={() => toggleExpand(meditation.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.meditationCard,
                    expandedId === meditation.id && styles.meditationCardExpanded,
                  ]}
                >
                  <Text style={styles.meditationName}>{meditation.name}</Text>
                  <Text style={styles.germanName}>{meditation.germanName}</Text>
                  <Text style={styles.description}>{meditation.description}</Text>
                  <Text style={styles.duration}>Dauer: {meditation.duration} Minuten</Text>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelBadgeText}>
                      {meditation.level === 'beginner'
                        ? 'Anfänger'
                        : meditation.level === 'intermediate'
                          ? 'Mittelstufe'
                          : 'Fortgeschritten'}
                    </Text>
                  </View>

                  {expandedId === meditation.id && (
                    <View style={styles.detailSection}>
                      <Text style={styles.focusPoint}>Fokus: {meditation.focusPoint}</Text>
                      {meditation.affirmation && (
                        <Text style={styles.affirmation}>"{meditation.affirmation}"</Text>
                      )}
                      <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startButtonText}>Meditation starten</Text>
                      </TouchableOpacity>
                    </View>
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
