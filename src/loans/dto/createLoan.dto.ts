export class createLoanDto {
  readonly id: number;
  readonly borrower_id: number;
  readonly amount: number;
  readonly interest_rate: number;
  readonly term: number;
}