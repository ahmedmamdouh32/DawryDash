export enum PlayerPosition {
    NotSet = 'NotSet',
    GoalKeeper = 'GoalKeeper',
    Defender = 'Defender',
    Midfielder = 'Midfielder',
    Attacker = 'Attacker'
}

export const PlayerPositionDisplay: Record<PlayerPosition, string> = {
    [PlayerPosition.NotSet]: 'Select Position',
    [PlayerPosition.GoalKeeper]: 'Goal Keeper',
    [PlayerPosition.Defender]: 'Defender',
    [PlayerPosition.Midfielder]: 'Midfielder',
    [PlayerPosition.Attacker]: 'Attacker'
};

// Options for dropdown
export const PlayerPositionOptions = Object.values(PlayerPosition).map(position => ({
    value: position,
    label: PlayerPositionDisplay[position]
}));