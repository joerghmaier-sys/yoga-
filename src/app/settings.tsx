import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
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
    backgroundColor: Colors.deepTeal,
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  title: {
    ...Typography.subheading,
    color: Colors.cream,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.lightGrey,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.body,
    color: Colors.saffron,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
  },
  settingItem: {
    backgroundColor: Colors.deepTeal,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.cream,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    ...Typography.captionBold,
    color: Colors.grey,
    marginTop: Spacing.xs,
  },
  timeButton: {
    backgroundColor: Colors.darkBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  timeButtonText: {
    ...Typography.captionBold,
    color: Colors.saffron,
  },
  statSection: {
    backgroundColor: Colors.deepTeal,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBg,
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statLabel: {
    ...Typography.bodySmall,
    color: Colors.grey,
  },
  statValue: {
    ...Typography.bodySmall,
    color: Colors.saffron,
    fontWeight: '600',
  },
  buttonSection: {
    marginTop: Spacing.lg,
  },
  button: {
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  primaryButton: {
    backgroundColor: Colors.saffron,
  },
  dangerButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    ...Typography.body,
    color: Colors.cream,
    fontWeight: '600',
  },
});

export default function SettingsScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('06:30');
  const [practiceCount, setPracticeCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const storage = useStorage();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const reminders = await storage.getItem('remindersEnabled');
      const time = await storage.getItem('reminderTime');
      const count = await storage.getItem('practiceCount');
      const streak = await storage.getItem('currentStreak');
      const music = await storage.getItem('musicEnabled');

      setRemindersEnabled(reminders === 'true');
      setReminderTime(time || '06:30');
      setPracticeCount(count ? parseInt(count) : 0);
      setCurrentStreak(streak ? parseInt(streak) : 0);
      setMusicEnabled(music === 'true');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const toggleReminders = async (value: boolean) => {
    setRemindersEnabled(value);
    await storage.setItem('remindersEnabled', String(value));
  };

  const toggleMusic = async (value: boolean) => {
    setMusicEnabled(value);
    await storage.setItem('musicEnabled', String(value));
  };

  const resetStats = async () => {
    await storage.setItem('practiceCount', '0');
    await storage.setItem('currentStreak', '0');
    setPracticeCount(0);
    setCurrentStreak(0);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Einstellungen</Text>
          <Text style={styles.subtitle}>Personalisiere deine Yoga-Praxis</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Erinnerungen</Text>
              <View style={styles.settingItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>Tägliche Erinnerungen</Text>
                  <Text style={styles.settingDescription}>
                    Werde jeden Morgen erinnert
                  </Text>
                </View>
                <Switch
                  value={remindersEnabled}
                  onValueChange={toggleReminders}
                  trackColor={{ false: '#333', true: '#ff6b35' }}
                  thumbColor={remindersEnabled ? '#fff' : '#888'}
                />
              </View>

              {remindersEnabled && (
                <View style={styles.settingItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.settingLabel}>Erinnerungszeit</Text>
                    <Text style={styles.settingDescription}>
                      Erinnere mich um
                    </Text>
                  </View>
                  <View style={styles.timeButton}>
                    <Text style={styles.timeButtonText}>{reminderTime}</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Audio</Text>
              <View style={styles.settingItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>Musik aktivieren</Text>
                  <Text style={styles.settingDescription}>
                    Höre Musik während der Meditation
                  </Text>
                </View>
                <Switch
                  value={musicEnabled}
                  onValueChange={toggleMusic}
                  trackColor={{ false: '#333', true: '#4a9eff' }}
                  thumbColor={musicEnabled ? '#fff' : '#888'}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistiken</Text>
              <View style={styles.statSection}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Gesamte Praktiken</Text>
                  <Text style={styles.statValue}>{practiceCount}</Text>
                </View>
                <View style={[styles.statRow, styles.statRowLast]}>
                  <Text style={styles.statLabel}>Aktueller Streak</Text>
                  <Text style={styles.statValue}>{currentStreak} Tage</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={resetStats}>
                <Text style={styles.buttonText}>Statistiken zurücksetzen</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 Tipp: Praktiziere jeden Morgen zur gleichen Zeit für die beste Erfahrung und um
                deinen Streak aufzubauen.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
