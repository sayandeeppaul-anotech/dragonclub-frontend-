import React,{ useState} from 'react'
import { Button } from '@mui/material';

const RowVisualization = ({ data }) => {
    const [numRows, setNumRows] = useState(15);
  
    const handleLoadMore = () => {
      console.log("Load More button clicked");
      setNumRows(numRows + 10);
    };
    const displayData = data.slice(0, numRows);
    return (
      <div>
        {displayData.map((row, rowIndex) => (
          <div
            key={row.id}
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "35px 0",
              position: "relative",
            }}
          >
            <div style={{ width: "50px", fontSize: "8px",color:"white",fontWeight:"bold" }}>
              {row.periodId.toString().slice(0, -2)}
            </div>
            {Array.from({ length: 10 }).map((_, circleIndex) => {
              const isColored = circleIndex === Number(row.numberOutcome.trim());
              return (
                <div
                  key={circleIndex}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "1px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    margin: "0 5px",
                    color:'white',
                    background: isColored
                      ? Array.isArray(row.colorOutcome) &&
                        row.colorOutcome.length === 2
                        ? `linear-gradient(to right, ${row.colorOutcome[0]} 50%, ${row.colorOutcome[1]} 50%)`
                        : row.colorOutcome
                      : "transparent",
                    colorOutcome: isColored ? "white" : "black",
                  }}
                >
                  {circleIndex}
                </div>
              );
            })}
            {rowIndex < data.length - 1 && (
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50px",
                  right: 0,
                  bottom: 0,
                }}
              >
                <path
                  d={`M${Number(row.numberOutcome.trim()) * 30 + 15} 20 Q ${
                    (Number(row.numberOutcome.trim()) +
                      Number(data[rowIndex + 1].numberOutcome.trim())) *
                      15 +
                    15
                  } 40 ${
                    Number(data[rowIndex + 1].numberOutcome.trim()) * 30 + 15
                  } 60`}
                  stroke="white"
                  fill="transparent"
                />
              </svg>
            )}
          </div>
        ))}
        <Button variant="contained" color="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      </div>
    );
  };

export default RowVisualization;