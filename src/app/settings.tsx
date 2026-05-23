import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useStorage } from '@/hooks/useStorage';

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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  timeButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6b35',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  statSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6b35',
  },
  buttonSection: {
    marginTop: 24,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#ff6b35',
  },
  dangerButton: {
    backgroundColor: '#8b0000',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  infoBox: {
    backgroundColor: '#2a3a4a',
    borderLeftWidth: 3,
    borderLeftColor: '#4a9eff',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 18,
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
