namespace lab1 {

enum Category {
  'Business analyst',
  'Developer',
  'Designer',
  'QA',
  'Scrum master'
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  category: Category;
}

function getAllWorkers(): Employee[] {
  return [
    { id: 1, name: 'Ivan', surname: 'Ivanov', available: true, salary: 1000, category: Category.Designer },
    { id: 2, name: 'Petro', surname: 'Petrov', available: true, salary: 1500, category: Category['Business analyst'] },
    { id: 3, name: 'Vasyl', surname: 'Vasyliev', available: false, salary: 1600, category: Category.Developer },
    { id: 4, name: 'Evgen', surname: 'Zhukov', available: true, salary: 1300, category: Category.Designer }
  ];
}

function logFirstAvailable(workers: Employee[] = getAllWorkers()): void {
  console.log(`Number of workers: ${workers.length}`);

  for (let worker of workers) {
    if (worker.available) {
      console.log(`First available worker: ${worker.name} ${worker.surname}`);
      break;
    }
  }
}

function getWorkersNamesByCategory(category: Category = Category.Designer): string[] {
  const workers = getAllWorkers();
  return workers.filter(worker => worker.category === category).map(worker => worker.surname);
}

function logWorkersNames(names: string[]): void {
  console.log(names.join(', '));
}

const getWorkerByID = (id: number): string => {
  const worker = getAllWorkers().find(worker => worker.id === id);
  if (worker) {
    return `${worker.name} ${worker.surname}, Salary: $${worker.salary}`;
  } else {
    return "Worker not found";
  }
}

function createCustomerID(name: string, id: number): string {
  return `${name}-${id}`;
}

const myID: string = createCustomerID('Ann', 10);

const IdGenerator: (name: string, id: number) => string = (name, id) => `${name}-${id}`;

const customerID = IdGenerator('Ann', 10);

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Customer name: ${name}`);
  if (age) console.log(`Age: ${age}`);
  if (city) console.log(`City: ${city}`);
}

function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
  console.log(`Customer: ${customer}`);

  const availableWorkers = workerIDs
    .map(id => {
      const workerDetails = getWorkerByID(id); 
      const worker = getAllWorkers().find(worker => worker.id === id); 
      return worker && worker.available ? workerDetails : null;
    })
    .filter(details => details !== null)
    .map(details => details as string); 

  return availableWorkers;
}

function showMenu() {
  console.log('Select task to run:');
  console.log('1: Task 1.1');
  console.log('2: Task 1.2');
  console.log('3: Task 1.3');
  console.log('4: Task 1.4');
  console.log('5: Task 1.5');
  console.log('0: Exit');
}

function runProgram() {
  let running = true;
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (question: string): Promise<number> => {
    return new Promise((resolve) => {
      rl.question(question, (answer: string) => resolve(parseInt(answer)));
    });
  };

  async function handleMenuSelection() {
    while (running) {
      showMenu();
      const choice = await askQuestion('Enter choice: ');

      switch (choice) {
        case 1:
          logFirstAvailable(getAllWorkers());
          break;
        case 2:
          const names = getWorkersNamesByCategory(Category.Designer);
          logWorkersNames(names);
          break;
        case 3:
          const developerNames = getWorkersNamesByCategory(Category.Developer);
          logWorkersNames(developerNames);
          const workerInfo = getWorkerByID(2); 
          console.log(workerInfo); 
          break;
        case 4:
          console.log(`MyID from function: ${myID}`); 
          console.log(`CustomerID from IdGenerator: ${customerID}`); 
          break;
        case 5:
          console.log("Task 1.5: Create Customer");
          createCustomer('John'); 
          createCustomer('John', 30);  
          createCustomer('John', 30, 'Kyiv'); 

          const workersByCategory = getWorkersNamesByCategory();
          console.log(`Workers in category Designer: ${workersByCategory.join(', ')}`);

          logFirstAvailable(); 

          const myWorkers = checkoutWorkers('Ann', 1, 2, 4);
          myWorkers.forEach(worker => console.log(worker));
          break;
        case 0:
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

runProgram();

}

