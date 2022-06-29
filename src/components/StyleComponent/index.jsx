import styled from "styled-components"

export const ProgressBar = styled.div`
  
  width:${props => props.width}%;
  color:${props => props.width > 51? "white" : props => props.width < 30? "white" : "black"};;
  background-color:${props => props.width > 51? "rgb(43, 223, 43)" : props => props.width < 30? "rgb(255, 0, 0)" : "rgb(251, 255, 0)"};
  border-radius:25px;
  padding: 4.5px 8px;
  display: flex;
  align-item:center;
  justify-content: end;
  font-size: 18px;
  height: 100%;
`

export const ProgressBarCost = styled.div`
  
  width:${props => props.width}%;
  color:${props => props.width > 51? "white" : props => props.width < 30? "white" : "black"};;
  background-color:${props => props.width > 51? "rgb(255, 0, 0)" : props => props.width < 30? "rgb(43, 223, 43)" : "rgb(251, 255, 0)"};
  border-radius:25px;
  padding: 4.5px 8px;
  text-align:right;
  display: flex;
  align-item:center;
  justify-content: end;
  font-size: 18px;
  height: 100%;
`
export const Overall = styled.span`
  color:${props => props.score > 3? "rgb(43, 223, 43)" : props => props.width < 2?"rgb(255, 0, 0)" : "rgb(251, 255, 0)"};
  text-shadow:${props => props.score > 3? "none" : props => props.width < 2? "none" : "black 1px 1px;"}
`

export const Overallborder = styled.span`
  border: 4px solid ${props => props.score > 3? "rgb(43, 223, 43)" : props => props.width < 2?"rgb(255, 0, 0)" : "rgb(251, 255, 0)"};;
  padding: 10px 20px;
  border-radius: 20px;
`

