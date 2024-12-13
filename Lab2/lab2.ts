import * as readline from 'readline';

namespace lab2 {
  interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: string;
    markPrize: PrizeLogger;
  }

  interface PrizeLogger {
    (prize: string): void;
  }

  const logPrize: PrizeLogger = (prize: string): void => {
    console.log(`Prize: ${prize}`);
  };

  interface Person {
    name: string;
    email: string;
  }

  interface Author extends Person {
    numBooksPublished: number;
  }

  interface Librarian extends Person {
    department: string;
    assistCustomer(custName: string): void;
  }

  class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    constructor(name: string, email: string, department: string) {
      this.name = name;
      this.email = email;
      this.department = department;
    }

    assistCustomer(custName: string): void {
      console.log(`${this.name} is assisting ${custName}`);
    }
  }

  class ReferenceItem {
    public title: string;
    private _publisher: string;
    protected year: number;

    static department = 'Programming Books';

    constructor(newTitle: string, newYear: number) {
        console.log('Creating a new ReferenceItem ...'); 
        this.title = newTitle;
        this.year = newYear;
        this._publisher = '';
    }

    get publisher(): string {
      return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
      this._publisher = newPublisher;
    }

    printItem(): void {
      console.log(`${this.title} was published in ${this.year}`);
      console.log(`Department: ${ReferenceItem.department}`); 
    }
  }

  class Encyclopedia extends ReferenceItem {
    edition: number;

    constructor(title: string, year: number, edition: number) {
      super(title, year);
      this.edition = edition;
    }

    printItem(): void {
      super.printItem();
      console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
      console.log(`${this.title} - ${this.year}`);
    }
  }

  abstract class AbstractReferenceItem {
    abstract printCitation(): void;
  }

  function getAllWorkers(): Worker[] {
    return [
      { id: 1, name: 'Ivan', surname: 'Ivanov', available: true, salary: 1000, category: 'Developer', markPrize: logPrize },
      { id: 2, name: 'Petro', surname: 'Petrov', available: true, salary: 1500, category: 'Business analyst', markPrize: logPrize },
      { id: 3, name: 'Vasyl', surname: 'Vasyliev', available: false, salary: 1600, category: 'Designer', markPrize: logPrize },
      { id: 4, name: 'Evgen', surname: 'Zhukov', available: true, salary: 1300, category: 'QA', markPrize: logPrize }
    ];
  }

  function getWorkerByID(id: number): Worker | undefined {
    return getAllWorkers().find(worker => worker.id === id);
  }

  function PrintWorker(worker: Worker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
  }

  const showMenu = (): void => {
    console.log('Select task to run:');
    console.log('1: Task 2.1 - Worker Interface');
    console.log('2: Task 2.2 - Prize Logger');
    console.log('3: Task 2.3 - Author & Librarian Interfaces');
    console.log('4: Task 2.4 - University Librarian');
    console.log('5: Task 2.5 - ReferenceItem');
    console.log('6: Task 2.6 - Encyclopedia');
    console.log('7: Task 2.7 - AbstractReferenceItem');
    console.log('0: Exit');
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let running = true;

  async function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
  }

  async function handleMenuSelection() {
    while (running) {
      showMenu();
      const choice = await askQuestion('Enter choice: ');

      switch (choice) {
        case '1':
          const worker = getWorkerByID(1);

          if (worker) {
            PrintWorker(worker);
          }
          break;

        case '2':
          logPrize('Best Worker of the Year');
          break;

        case '3':
          const favoriteAuthor: Author = { name: 'J.K. Rowling', email: 'jkrowling@example.com', numBooksPublished: 7 };
          console.log(favoriteAuthor);

          const favoriteLibrarian: Librarian = {
            name: 'Sarah Smith',
            email: 'sarahsmith@example.com',
            department: 'Literature',
            assistCustomer: (custName: string) => {
              console.log(`${favoriteLibrarian.name} is assisting ${custName}`);
            }
          };
          favoriteLibrarian.assistCustomer('John Doe');
          break;

        case '4':
          const favoriteLibrarian1: Librarian = new UniversityLibrarian('Anna', 'anna@example.com', 'Science');
          favoriteLibrarian1.assistCustomer('Mark');
          break;

        case '5':
          const refItem = new ReferenceItem('Typescript Handbook', 2024);
          refItem.publisher = 'caps';
          console.log(refItem.publisher);
          refItem.printItem();
          break;

        case '6':
          const refBook = new Encyclopedia('Encyclopedia of Programming', 2024, 3);
          refBook.printItem();
          
          break;

        case '7':
          const abstractRef: AbstractReferenceItem = new Encyclopedia('Abstract Typescript', 2024, 1);
          abstractRef.printCitation();
          break;

        case '0':
          running = false;
          rl.close();
          console.log('Exiting program...');
          break;

        default:
          console.log('Invalid choice, try again.');
      }
    }
  }

  handleMenuSelection();
}
