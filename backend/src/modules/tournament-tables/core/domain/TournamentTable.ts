import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { TournamentTablesWereAssigned } from './event/TournamentTablesWereAssigned';
import { TableNumber } from './TableNumber';

export class TournamentTable {
  readonly tournamentId: string;
  readonly tableNumber: TableNumber;
  readonly tableName: string;

  constructor(props: { tournamentId: string; tableNumber: TableNumber; tableName: string }) {
    this.tournamentId = props.tournamentId;
    this.tableNumber = props.tableNumber;
    this.tableName = props.tableName;
  }
}

export function assignTablesToTournament(
  state: TournamentTable[] | undefined,
  command: { tournamentId: string; tables: { tableNumber: TableNumber; tableName: string }[] },
  currentTime: Date,
): DomainCommandResult<TournamentTable[]> {
  if (state !== undefined && state.length > 0) {
    throw new Error('Some tables are already assigned to that tournament.');
  }
  if (command.tables.length === 0) {
    throw new Error('Tournament must have at least 1 table assigned.');
  }
  if (isTableNumberDuplicated(command.tables)) {
    throw new Error('Tables numbers must be different.');
  }

  const tournamentTables: TournamentTable[] = command.tables.map((table) => {
    return new TournamentTable({
      tournamentId: command.tournamentId,
      tableNumber: table.tableNumber,
      tableName: table.tableName,
    });
  });

  const tournamentTablesWereAssigned = new TournamentTablesWereAssigned({
    occurredAt: currentTime,
    tablesAssigned: tournamentTables,
  });

  const assignedTablesToTournament = onTournamentTablesWereAssigned(state, tournamentTablesWereAssigned);

  return {
    state: assignedTablesToTournament,
    events: [tournamentTablesWereAssigned],
  };
}

function isTableNumberDuplicated(tables: { tableNumber: TableNumber; tableName: string }[]) {
  const uniqueValues = new Set(tables.map((table) => table.tableNumber.raw));
  return uniqueValues.size < tables.length;
}

function onTournamentTablesWereAssigned(state: TournamentTable[] | undefined, event: TournamentTablesWereAssigned): TournamentTable[] {
  return event.tablesAssigned.map((table) => new TournamentTable(table));
}