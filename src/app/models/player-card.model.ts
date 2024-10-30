export interface PlayerCardModel {
    id: number;
    fifa_version?: string;
    fifa_update?: string;
    player_face_url?: string;
    long_name: string;
    player_positions?: string;
    club_name?: string; // El valor puede ser null, así que lo marco como opcional
    nationality_name?: string; // El valor puede ser null, así que lo marco como opcional
    overall?: number;
    potential?: number;
    value_eur?: number; // El valor puede ser null, así que lo marco como opcional
    wage_eur?: number; // El valor puede ser null, así que lo marco como opcional
    age?: number;
    height_cm?: number; // El valor puede ser null, así que lo marco como opcional
    weight_kg?: number; // El valor puede ser null, así que lo marco como opcional
    preferred_foot?: string; // El valor puede ser null, así que lo marco como opcional
    weak_foot?: number; // El valor puede ser null, así que lo marco como opcional
    skill_moves?: number; // El valor puede ser null, así que lo marco como opcional
    international_reputation?: number; // El valor puede ser null, así que lo marco como opcional
    work_rate?: string; // El valor puede ser null, así que lo marco como opcional
    body_type?: string; // El valor puede ser null, así que lo marco como opcional
    pace?: number; // El valor puede ser null, así que lo marco como opcional
    shooting?: number; // El valor puede ser null, así que lo marco como opcional
    passing?: number; // El valor puede ser null, así que lo marco como opcional
    dribbling?: number; // El valor puede ser null, así que lo marco como opcional
    defending?: number; // El valor puede ser null, así que lo marco como opcional
    physic?: number; // El valor puede ser null, así que lo marco como opcional
    attacking_crossing?: number; // El valor puede ser null, así que lo marco como opcional
    attacking_finishing?: number; // El valor puede ser null, así que lo marco como opcional
    attacking_heading_accuracy?: number; // El valor puede ser null, así que lo marco como opcional
    attacking_short_passing?: number; // El valor puede ser null, así que lo marco como opcional
    attacking_volleys?: number; // El valor puede ser null, así que lo marco como opcional
    skill_dribbling?: number; // El valor puede ser null, así que lo marco como opcional
    skill_curve?: number; // El valor puede ser null, así que lo marco como opcional
    skill_fk_accuracy?: number; // El valor puede ser null, así que lo marco como opcional
    skill_long_passing?: number; // El valor puede ser null, así que lo marco como opcional
    skill_ball_control?: number; // El valor puede ser null, así que lo marco como opcional
    movement_acceleration?: number; // El valor puede ser null, así que lo marco como opcional
    movement_sprint_speed?: number; // El valor puede ser null, así que lo marco como opcional
    movement_agility?: number; // El valor puede ser null, así que lo marco como opcional
    movement_reactions?: number; // El valor puede ser null, así que lo marco como opcional
    movement_balance?: number; // El valor puede ser null, así que lo marco como opcional
    power_shot_power?: number; // El valor puede ser null, así que lo marco como opcional
    power_jumping?: number; // El valor puede ser null, así que lo marco como opcional
    power_stamina?: number; // El valor puede ser null, así que lo marco como opcional
    power_strength?: number; // El valor puede ser null, así que lo marco como opcional
    power_long_shots?: number; // El valor puede ser null, así que lo marco como opcional
    mentality_aggression?: number; // El valor puede ser null, así que lo marco como opcional
    mentality_interceptions?: number; // El valor puede ser null, así que lo marco como opcional
    mentality_positioning?: number; // El valor puede ser null, así que lo marco como opcional
    mentality_vision?: number; // El valor puede ser null, así que lo marco como opcional
    mentality_penalties?: number; // El valor puede ser null, así que lo marco como opcional
    mentality_composure?: number; // El valor puede ser null, así que lo marco como opcional
    defending_marking?: number; // El valor puede ser null, así que lo marco como opcional
    defending_standing_tackle?: number; // El valor puede ser null, así que lo marco como opcional
    defending_sliding_tackle?: number; // El valor puede ser null, así que lo marco como opcional
    goalkeeping_diving?: number; // El valor puede ser null, así que lo marco como opcional
    goalkeeping_handling?: number; // El valor puede ser null, así que lo marco como opcional
    goalkeeping_kicking?: number; // El valor puede ser null, así que lo marco como opcional
    goalkeeping_positioning?: number; // El valor puede ser null, así que lo marco como opcional
    goalkeeping_reflexes?: number; // El valor puede ser null, así que lo marco como opcional
    goalkeeping_speed?: number; // El valor puede ser null, así que lo marco como opcional
    player_traits?: string[]; // El valor puede ser null, así que lo marco como opcional
}
