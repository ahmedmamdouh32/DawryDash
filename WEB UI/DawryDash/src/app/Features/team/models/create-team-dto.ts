export interface CreateTeamDTO {
    userId: string,
    Name: string,
    slogan?: string,
    teamAbbreviation: string,
    primaryColor: string,
    secondaryColor: string,
    description: string | null,
    image?: File

}
