export interface TournamentDetailsDTO {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    creationDate: Date;
    startDate: string;
    address: string;
    duration: number;
    matchDurationMinutes: number;
    status: string;
    maxTeams: number;
    teamsEntered: number;
    creatorFullname: string;
    creatorImgUrl: string;
    prize: number;
}
