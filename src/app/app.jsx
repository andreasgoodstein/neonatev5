import React from "react";

import StatsStorage from "storage/stats";
import StatsContext from "context/stats";
import StatsPage from "pages/stats";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: StatsStorage.getStats()
    };

    this.updateStats = this.updateStats.bind(this);
  }

  updateStats(stats) {
    StatsStorage.setStats(stats);
    this.setState(() => ({ stats }));
  }

  render() {
    const context = {
      stats: this.state.stats,
      updateStats: this.updateStats
    };

    return (
      <StatsContext.Provider value={context}>
        <StatsPage />
      </StatsContext.Provider>
    );
  }
}

export default App;
