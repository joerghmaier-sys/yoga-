import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COURSE_DATA } from '@/data/course';
import { Colors, Spacing, Typography } from '@/constants/design';
import { useStorage } from '@/hooks/useStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.saffron,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  greeting: {
    ...Typography.headline,
    color: Colors.darkBg,
    marginBottom: Spacing.xs,
  },
  date: {
    ...Typography.bodySmall,
    color: Colors.darkBg,
    opacity: 0.9,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.deepTeal,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.headline,
    color: Colors.saffron,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.captionBold,
    color: Colors.lightGrey,
    textAlign: 'center',
  },
  sessionTitle: {
    ...Typography.subheading,
    color: Colors.cream,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  sessionCard: {
    backgroundColor: Colors.deepTeal,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.saffron,
  },
  sessionCardTitle: {
    ...Typography.subheading,
    color: Colors.cream,
    marginBottom: Spacing.md,
  },
  sessionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBg,
  },
  sessionStepLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  stepIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    ...Typography.body,
    color: Colors.cream,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  stepDuration: {
    ...Typography.captionBold,
    color: Colors.saffron,
  },
  startButton: {
    backgroundColor: Colors.saffron,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  startButtonText: {
    ...Typography.body,
    color: Colors.darkBg,
    fontWeight: '700',
  },
  todayTitle: {
    ...Typography.subheading,
    color: Colors.cream,
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
  lessonPreview: {
    backgroundColor: Colors.deepTeal,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
  },
  lessonWord: {
    ...Typography.body,
    color: Colors.saffron,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  lessonDescription: {
    ...Typography.bodySmall,
    color: Colors.lightGrey,
    lineHeight: 20,
  },
});

const dailySession = [
  { icon: '🌬️', name: 'Pranayama', duration: '5 Min', key: 'pranayama' },
  { icon: '🧘', name: 'Asana', duration: '10 Min', key: 'asana' },
  { icon: '🕉️', name: 'Meditation', duration: '10 Min', key: 'meditation' },
  { icon: '📝', name: 'Tagebuch', duration: '5 Min', key: 'journal' },
];

export default function HomeScreen() {
  const [practiceCount, setPracticeCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [todayLesson, setTodayLesson] = useState<any>(null);
  const storage = useStorage();

  useEffect(() => {
    loadStats();
    loadTodayLesson();
  }, []);

  const loadStats = async () => {
    try {
      const count = await storage.getItem('practiceCount');
      const streak = await storage.getItem('currentStreak');

      setPracticeCount(count ? parseInt(count) : 0);
      setCurrentStreak(streak ? parseInt(streak) : 0);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadTodayLesson = () => {
    const block = COURSE_DATA.find(b => b.status === 'active');
    if (block && block.lektionen.length > 0) {
      setTodayLesson(block.lektionen[0]);
    }
  };

  const startSession = async () => {
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
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Guten Morgen 🌅</Text>
          <Text style={styles.date}>{dateStr}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{practiceCount}</Text>
                <Text style={styles.statLabel}>Gesamte Praktiken</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>🔥 {currentStreak}</Text>
                <Text style={styles.statLabel}>Streak Tage</Text>
              </View>
            </View>

            <Text style={styles.sessionTitle}>Deine Sadhana heute</Text>
            <View style={styles.sessionCard}>
              <Text style={styles.sessionCardTitle}>30-Min Morgen-Routine</Text>
              {dailySession.map((step, idx) => (
                <View
                  key={step.key}
                  style={[styles.sessionStep, idx === dailySession.length - 1 && styles.sessionStepLast]}
                >
                  <Text style={styles.stepIcon}>{step.icon}</Text>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepName}>{step.name}</Text>
                    <Text style={styles.stepDuration}>{step.duration}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.startButton} onPress={startSession}>
                <Text style={styles.startButtonText}>▶ SADHANA STARTEN</Text>
              </TouchableOpacity>
            </View>

            {todayLesson && (
              <>
                <Text style={styles.todayTitle}>📖 Heute's Lektion</Text>
                <View style={styles.lessonPreview}>
                  <Text style={styles.lessonWord}>{todayLesson.sanskritWort}</Text>
                  <Text style={styles.lessonDescription}>{todayLesson.bedeutung}</Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
