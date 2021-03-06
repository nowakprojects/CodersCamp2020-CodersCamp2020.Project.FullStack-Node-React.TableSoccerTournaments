export class TournamentTeamDto {
  readonly teamId: string;
  readonly firstTeamPlayer: string;
  readonly secondTeamPlayer: string;

  constructor(teamId: string, firstTeamPlayer: string, secondTeamPlayer: string) {
    this.teamId = teamId;
    this.firstTeamPlayer = firstTeamPlayer;
    this.secondTeamPlayer = secondTeamPlayer;
  }
}
