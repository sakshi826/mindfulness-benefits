import { supabase, setUserContext } from './supabase';

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

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    const { error } = await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
    if (error) throw error;
}

export async function saveMindfulnessSession(userId: number, session: MindfulnessSession) {
    await setUserContext(userId);
    const { error } = await supabase.from('mindfulness_sessions').insert({
        user_id: userId,
        ...session
    });
    if (error) throw error;
}

export async function getMindfulnessSessions(userId: number): Promise<MindfulnessSession[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('mindfulness_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function deleteMindfulnessSession(userId: number, id: string) {
    await setUserContext(userId);
    const { error } = await supabase
        .from('mindfulness_sessions')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

    if (error) throw error;
}

export async function saveBenefitsTracking(userId: number, tracking: BenefitsTracking) {
    await setUserContext(userId);
    const { error } = await supabase.from('benefits_tracking').insert({
        user_id: userId,
        ...tracking
    });
    if (error) throw error;
}

export async function getBenefitsTracking(userId: number): Promise<BenefitsTracking[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('benefits_tracking')
        .select('*')
        .eq('user_id', userId)
        .order('tracked_date', { ascending: false });

    if (error) throw error;
    return data || [];
}
