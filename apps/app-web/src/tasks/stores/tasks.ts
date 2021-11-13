import { createDomain } from "effector";
import { authRequest } from "../../common/request";

const domain = createDomain("tasks");

/**
 * Store
 */
interface TasksStore {
  loading: boolean;
  tasks: any[];
}
export const $tasks = domain.createStore<TasksStore>({
  loading: false,
  tasks: [],
});

/**
 * Effects
 */
export const tasksFetchFx = domain.createEffect(() => {
  return authRequest("http://localhost:3001/tasks");
});
$tasks.on(tasksFetchFx.pending, (store, pending) => ({
  ...store,
  loading: pending,
}));
$tasks.on(tasksFetchFx.doneData, (store, response) => ({
  ...store,
  tasks: response.data,
}));
