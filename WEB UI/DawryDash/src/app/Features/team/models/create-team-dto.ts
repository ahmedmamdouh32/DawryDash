export interface CreateTeamDTO {
    userId: string,
    name: string,
    slogan?: string,
    teamAbbreviation: string,
    primaryColor: string,
    secondaryColor: string,
    description: string | null,
    image?: File

}
