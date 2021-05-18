import "./BaseballReferenceTable.css";

const BaseballReferenceTable = ({ playerInput, players }) => {
  return (
    <table className="stats_table">
      <tbody>
        <tr>
          <th>Rk</th>
          <th className="name-border">Name</th>
          <th>Age</th>
          <th>G</th>
          <th>PA</th>
          <th>AB</th>
          <th>BA</th>
          <th>OBP</th>
          <th>HR</th>
          <th>SLG</th>
          <th>OPS</th>
          <th>OPS+</th>
          <th>RBI</th>
          <th>R</th>
          <th>H</th>
          <th>2B</th>
          <th>3B</th>
          <th>SB</th>
          <th>CS</th>
          <th>BB</th>
          <th>SO</th>
          <th>TB</th>
          <th>POS Summary</th>
        </tr>
        {players.map((value, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td className="name-col name-row">
                {value.show || playerInput === value.player
                  ? value.player
                  : null}
              </td>
              <td>{value.age}</td>
              <td>{value.G}</td>
              <td>{value.PA}</td>
              <td>{value.AB}</td>
              <td>{value.batting_avg}</td>
              <td>{value.onbase_perc}</td>
              <td>{value.HR}</td>
              <td>{value.slugging_perc}</td>
              <td>{value.onbase_plus_slugging}</td>
              <td>{value.onbase_plus_slugging_plus}</td>
              <td>{value.RBI}</td>
              <td>{value.R}</td>
              <td>{value.H}</td>
              <td>{value["2B"]}</td>
              <td>{value["3B"]}</td>
              <td>{value.SB}</td>
              <td>{value.CS}</td>
              <td>{value.BB}</td>
              <td>{value.SO}</td>
              <td>{value.TB}</td>
              <td>{value.pos_summary}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BaseballReferenceTable;
