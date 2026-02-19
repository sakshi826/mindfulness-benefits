import { supabase, setUserContext, isSupabaseConfigured } from './supabase';

export interface MindfulnessSession {
    id?: string;
    logged_at: string;
    activity_type: string;
    duration_min: number;
    guided: boolean;
    completion_rate?: number;
    focus_level?: number;
    benefits_noted: string[];
    notes?: string;
}

export interface BenefitsTracking {
    id?: string;
    tracked_date: string;
    benefit_type: string;
    rating: number;
    improvement: boolean;
    notes?: string;
    session_count: number;
}

const MOCK_SESSIONS: MindfulnessSession[] = [
    { logged_at: new Date().toISOString(), activity_type: 'Meditation', duration_min: 15, guided: true, benefits_noted: ['Calm'] }
];

const MOCK_TRACKING: BenefitsTracking[] = [
    { tracked_date: new Date().toISOString(), benefit_type: 'Focus', rating: 4, improvement: true, session_count: 5 }
];

export async function upsertUser(userId: number): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
    } catch (e) {
        console.warn('DB: upsertUser failed:', e);
    }
}

export async function saveMindfulnessSession(userId: number, session: MindfulnessSession) {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        const { error } = await supabase.from('mindfulness_sessions').insert({
            user_id: userId,
            ...session
        });
        if (error) throw error;
    } catch (e) {
        console.error('DB: saveMindfulnessSession failed:', e);
    }
}

export async function getMindfulnessSessions(userId: number): Promise<MindfulnessSession[]> {
    if (!isSupabaseConfigured) return MOCK_SESSIONS;
    try {
        await setUserContext(userId);
        const { data, error } = await supabase
            .from('mindfulness_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('logged_at', { ascending: false });

        if (error) throw error;
        return data || MOCK_SESSIONS;
    } catch (e) {
        console.error('DB: getMindfulnessSessions failed:', e);
        return MOCK_SESSIONS;
    }
}

export async function deleteMindfulnessSession(userId: number, id: string) {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        const { error } = await supabase
            .from('mindfulness_sessions')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) throw error;
    } catch (e) {
        console.error('DB: deleteMindfulnessSession failed:', e);
    }
}

export async function saveBenefitsTracking(userId: number, tracking: BenefitsTracking) {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        const { error } = await supabase.from('benefits_tracking').insert({
            user_id: userId,
            ...tracking
        });
        if (error) throw error;
    } catch (e) {
        console.error('DB: saveBenefitsTracking failed:', e);
    }
}

export async function getBenefitsTracking(userId: number): Promise<BenefitsTracking[]> {
    if (!isSupabaseConfigured) return MOCK_TRACKING;
    try {
        await setUserContext(userId);
        const { data, error } = await supabase
            .from('benefits_tracking')
            .select('*')
            .eq('user_id', userId)
            .order('tracked_date', { ascending: false });

        if (error) throw error;
        return data || MOCK_TRACKING;
    } catch (e) {
        console.error('DB: getBenefitsTracking failed:', e);
        return MOCK_TRACKING;
    }
}