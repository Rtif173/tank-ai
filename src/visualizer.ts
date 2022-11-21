
import AISettings from "./AISettings";
import { repeatStr } from "./mathematics";
import { Player } from "./player";

type TextConcat<part1 extends string, part2 extends string> = `${part1}${part2}`

export class Visualiser{
    table = document.getElementsByTagName("table")[0]!;
    info = document.getElementById("sum")!;
    td: HTMLCollectionOf<HTMLTableCellElement>;
    constructor(){
        this.table.innerHTML = "<table>" + repeatStr("<tr><td></td><td></td><td></td></tr>", (AISettings.numberOfRays+1)) + "</table>"
        this.td = document.getElementsByTagName("td");
        console.log(this.td);
    }
    draw(player: Player, t: "Angular"|"Move"|"Shoot"){
        let data = player.ai.data;
        const tt = ("weights"+t) as TextConcat<"weights", typeof t>;
        const ts = ((t != "Shoot" ? "speed":"") + t) as TextConcat<"speed", Exclude <typeof t, "Shoot">> | "Shoot";
        for (let i = 0; i<data.length; i++){
            this.td[3*i].style.backgroundColor = `rgba(0,0,0,${data[i]})`;
            this.td[3*i].innerHTML = data[i].toFixed(2);

            this.td[3*i+1].style.backgroundColor = `rgba(255,0,0,${player.ai[tt][i]})`;
            this.td[3*i+1].innerHTML = player.ai[tt][i]?.toFixed(2);

            this.td[3*i+2].style.backgroundColor = `rgba(0,0,255,${data[i]*player.ai[tt][i]})`;
            this.td[3*i+2].innerHTML = (data[i]*player.ai[tt][i]).toFixed(2);
            
        }
        this.info.innerHTML = player.ai[ts].toFixed(2);

    }
}