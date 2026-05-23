import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRANAYAMA_EXERCISES, MEDITATIONS, MORNING_ROUTINE } from '@/data/yoga';
import { useStorage } from '@/hooks/useStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    marginTop: 24,
  },
  routineCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  routineStep: {
    marginBottom: 12,
  },
  stepName: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDuration: {
    fontSize: 13,
    color: '#888',
  },
  startButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseGrid: {
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4a9eff',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  exerciseSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  duration: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
});

export default function HomeScreen() {
  const [practiceCount, setPracticeCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastPractice, setLastPractice] = useState<string | null>(null);
  const storage = useStorage();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const count = await storage.getItem('practiceCount');
      const streak = await storage.getItem('currentStreak');
      const last = await storage.getItem('lastPractice');

      setPracticeCount(count ? parseInt(count) : 0);
      setCurrentStreak(streak ? parseInt(streak) : 0);
      setLastPractice(last);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const startPractice = async () => {
    const today = new Date().toDateString();
    const last = await storage.getItem('lastPractice');

    const newCount = practiceCount + 1;
    let newStreak = currentStreak + 1;

    if (last && last !== today) {
      const lastDate = new Date(last);
      const daysDiff = Math.floor((new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 1) newStreak = 1;
    }

    await storage.setItem('practiceCount', String(newCount));
    await storage.setItem('currentStreak', String(newStreak));
    await storage.setItem('lastPractice', today);

    setPracticeCount(newCount);
    setCurrentStreak(newStreak);
    setLastPractice(today);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.greeting}>Guten Morgen</Text>
              <Text style={styles.subGreeting}>Beginne deinen Yoga-Tag</Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{practiceCount}</Text>
                <Text style={styles.statLabel}>Gesamte Praxis</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{currentStreak}</Text>
                <Text style={styles.statLabel}>Streak (Tage)</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Morgen-Routine</Text>
            <View style={styles.routineCard}>
              <Text style={styles.routineTitle}>30 Minuten Yoga Morgen</Text>
              {MORNING_ROUTINE.steps.map((step, index) => (
                <View key={index} style={styles.routineStep}>
                  <Text style={styles.stepName}>{step.name}</Text>
                  <Text style={styles.stepDuration}>{step.defaultDuration} Minuten</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.startButton} onPress={startPractice}>
                <Text style={styles.startButtonText}>Morgen-Routine starten</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Heute empfohlen</Text>
            <View style={styles.exerciseGrid}>
              {PRANAYAMA_EXERCISES.slice(0, 2).map(exercise => (
                <View key={exercise.id} style={styles.exerciseCard}>
                  <Text style={styles.exerciseTitle}>{exercise.germanName}</Text>
                  <Text style={styles.exerciseSubtitle}>{exercise.description}</Text>
                  <Text style={styles.duration}>{exercise.duration} Minuten</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Meditationen</Text>
            <View style={styles.exerciseGrid}>
              {MEDITATIONS.filter(m => m.level === 'beginner').slice(0, 2).map(med => (
                <View key={med.id} style={styles.exerciseCard}>
                  <Text style={styles.exerciseTitle}>{med.germanName}</Text>
                  <Text style={styles.exerciseSubtitle}>{med.description}</Text>
                  <Text style={styles.duration}>{med.duration} Minuten</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
