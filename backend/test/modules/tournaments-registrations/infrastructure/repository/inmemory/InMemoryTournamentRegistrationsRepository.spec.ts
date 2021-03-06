import { TournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/core/application/TournamentRegistrationsRepository';
import { TournamentRegistrationsRepositoryTestCases } from '../TournamentRegistrationsRepositoryTestCases';
import { PostgreSqlTournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/postgresql/PostgreSqlTournamentRegistrationsRepository';
import { TypeOrmTestSupport } from '../../../../../test-support/shared/infrastructure/TypeOrmTestSupport';
import { InMemoryTournamentRegistrationsRepository } from '../../../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';

describe('TournamentRegistrationsRepository', () => {
  TournamentRegistrationsRepositoryTestCases({
    name: 'PostgreSQL Implementation',
    repositoryFactory: () => new InMemoryTournamentRegistrationsRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
