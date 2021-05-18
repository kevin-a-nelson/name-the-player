import "./BballReferenceTable.css";

const BballReferenceTable = ({ playerInput, players }) => {
  return (
    <table className="stats_table">
      <tbody>
        <tr>
          <th>Rk</th>
          <th className="name-border">Name</th>
          <th>Age</th>
          <th>G</th>
          <th>GS</th>
          <th>MP</th>
          <th>PTS/G</th>
          <th>FG</th>
          <th>FGA</th>
          <th>FG%</th>
          <th>3P</th>
          <th>3PA</th>
          <th>3P%</th>
          <th>2P</th>
          <th>2PA</th>
          <th>2P%</th>
          <th>eFG%</th>
          <th>FT</th>
          <th>FTA</th>
          <th>FT%</th>
          <th>ORB</th>
          <th>DRB</th>
          <th>TRB</th>
          <th>AST</th>
          <th>STL</th>
          <th>BLK</th>
          <th>TOV</th>
          <th>PF</th>
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
              <td>{value.g}</td>
              <td>{value.gs}</td>
              <td>{value.mp_per_g}</td>
              <td>{value.pts_per_g}</td>
              <td>{value.fg_per_g}</td>
              <td>{value.fga_per_g}</td>
              <td>{value.fg_pct}</td>
              <td>{value.fg3_per_g}</td>
              <td>{value.fg3a_per_g}</td>
              <td>{value.fg3_pct}</td>
              <td>{value.fg2_per_g}</td>
              <td>{value.fg2a_per_g}</td>
              <td>{value.fg2_pct}</td>
              <td>{value.efg_pct}</td>
              <td>{value.ft_per_g}</td>
              <td>{value.fta_per_g}</td>
              <td>{value.ft_pct}</td>
              <td>{value.orb_per_g}</td>
              <td>{value.drb_per_g}</td>
              <td>{value.trb_per_g}</td>
              <td>{value.ast_per_g}</td>
              <td>{value.stl_per_g}</td>
              <td>{value.blk_per_g}</td>
              <td>{value.tov_per_g}</td>
              <td>{value.pf_per_g}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BballReferenceTable;
