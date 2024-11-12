import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Mark as a priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
