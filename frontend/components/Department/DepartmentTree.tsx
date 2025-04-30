import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '../../queries/departments';

export default function DepartmentTree() {
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="tree-view">
      {data.getDepartments.map((dept) => (
        <div key={dept.id} className="ml-4">
          <h3 className="font-bold">{dept.name}</h3>
          {dept.subDepartments.map((sub) => (
            <div key={sub.id} className="ml-8">
              {sub.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}