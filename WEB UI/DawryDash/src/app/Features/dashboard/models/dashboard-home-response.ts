export interface DashboardHomeResponse {

    user: {
        fullName: string,
        imgUrl: string,
        userName: string
    },

    latestTeams: {
        id: number;
        name: string,
        membersCount: number,
        imgUrl: string
    }[],

    activeTournaments: {
        id: number,
        status: string,
        name: string,
        startDate: string,
        imgUrl: string,
        maxTeams: number,
        teamsEntered: number
    }[]
}
