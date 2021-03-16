import { GlobalStatistics } from './GlobalStatisticsInterface';
import { Country } from './CountryInterface';

export interface CaseStatistics {
  'Global': GlobalStatistics;
  'Countries': Array<Country>;
}
