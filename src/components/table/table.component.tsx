import InfiniteScroll from "react-infinite-scroll-component";
import { IColumns, IUser } from "../../types";

export function Table({
  columns,
  data,
  update,
}: {
  columns: IColumns[];
  data: IUser[];
  update: () => void;
}) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={update}
      hasMore={true}
      loader={<h4>Loading more 2 itens...</h4>}
    >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                className="border-b border-blue-gray-100 bg-blue-50 p-4"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => {
            const isLast = i === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={i}>
                <td className={classes}>{row.name}</td>
                <td className={classes}>{row.username}</td>
                <td className={classes}>{row.email}</td>
                <td className={classes}>{row.address.city}</td>
                <td className={classes}>{row.phone}</td>
                <td className={classes}>{row.website}</td>
                <td className={classes}>{row.company.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
