import {Component, OnInit} from '@angular/core';
import {ThemeSwitchComponent} from "../theme-switch/theme-switch.component";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {LoginService} from "../services/login.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        ThemeSwitchComponent,
        RouterLink,
        NgIf
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

    isAdmin: boolean = false;

    constructor(

        private loginService: LoginService,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,) {
    }
    // imgurl:string = "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAIztJREFUeNrsfQlbG8eabi0t9s1gbLzGsePs68lykpmbMzP3Pnee+dHz3P2cORMndhzb2MZsZkeAEAiElq6qW1Vfd6sRxIkdW0it9w3BQoiWurve+vbv47PreQYAwNlB4BIAAEgIACAhAAAgIQCAhAAAgIQAABICAAASAgBICAAASAgAICEAACAhAICEAACAhAAAEgIAABICAEgIAABICAAgIQAAICEAgIQAAICEAAASAgAAEgIASAgAAEgIACAhAAAgIQCAhAAAgIQAABICAAASAgBICAAASAgAICEAACAhAICEAACAhAAAEgIAABICAEgIAABICAAgIQAAICEAgIQAAICEAAASAgAAEgIASAgAAEgIACAhAAAgIQCAhAAAgIQAABICAAASAgBICAAASAgAICEAACAhAICEAACAhAAAEgIAABICAEgIACAhAAAgIQCAhAAAgIQAABICAAASAgBICLQcnElm3F3gnGvONBP2y3CZfo1ixghuvycvcH9iGvfOPm//vOnI7sX+OWMMHT967P9W49a3DQJcgrOFYYoL7qhhiFXaPgiMrNtnLW10KISQhkllHGHdqzVx99hW6p437kkjhGk86Q4ntOSedUpzbg9mlCWy/dkcOwQR1f3aGNwUkLDLJCHn6XVvH3uRaKSljWeg1pY8vC68qNQ64KfzxEpU46GFiXno/zEytMcUitjpDm//t+KXyJz6GHT8kxIVAAmzLgmJUV4KaifqHEscf6z6yZ0KyqXQXoe03wQPjJVksbYZH8L9bU6755UThuyYqmkZzZ1UtGIwIbnRJuFasgvQr3BHQMIuZKEgqlgOWL3Rsk2nlEmnRjpeyOL+XrlcPigduX/qtUq1UquGVnC5PxXuFXVmcpLncrneINefyw0PDA4PDwz1948PD0sptSenk3UsdCLP3nZ9bBcgKjaJZQAk7ApYm40olxAgsuVYsFcsbu0Ut4u7u3v75VpVeSsukXH6hERVnFdYrUQcZlv0fE9vMDY0PDkyenFy/NzoSBAEiinn4YnVWuGPlAhD3JEzMElm1/O4CmdJQh4JQi+mLMXEzm5hdWNrpbBd2i85/TD2gnpJJU+w71dVXNItPceEMo53gwO9l8Ynbly8cHHyPDlUvTdIn2qdAiBh1yml1bC+sra+uL6xs7vnohSxcuiJRwx8EUOaAg7a+2ASkZlom/Tb/uHB96YuXL08NTAwYEmY0M++r/gdJAdAwra/pidEivNaCp4ED5wUYpIb5Z7nslypzj9fmVtertZVWoi9YYcQtzbk9StTt9+6NjY66D6giT6YYUpQyESI0KrFlpfwmoKEncXAX1uy5LRMRI39sRaqmcWlmbl5pRQTgVLGOVF0GAinQL55HjrZaD/P9SuXP3zn5ujAANehduFJbrnn/jGKIoeQkCBhBxMysdDsOvaROEMBOvvj/PLK9JPZcqjSGqV/sZacv/Elb9/BCMVc/J5r1cvZu29f/+C929LtIYZSdrjz9XCoqSBhh9t6XtpYKMMjPySXxf3Sz9NP8zs71t7TJ+Rny+J1pHDS+7o0HcEGBge+eO/21IVJ6Z5oBDAZBwNBws40C5vi4ETFZ4vPLQOt8kkJLl4hbLwgbK31xWN/j0tJ5d5QZOr2W2999uG7aYcNABJ2tmVIAsd+r4Tm7sPplfV8Ila0I6AW5iSBOTtT9W9iZOibzz8ZHexL3DOSg40gYceqo8TArf3Du/cfFkqHaVuRKiecoXj8yZbceX08AslF5C6KPrOVhH/+4tNrUxeZDuEafaNAPcvrZ11aIyUG5vP5//G3O5aBpHPSC6T3TAbGPWiky7SsjsGIpo9t6RdylmjRVvr9/e79mYVla8RKKKUgYWcposzXNLiAu6tRMosr6/9+99FJEafJEov1zlZLwuOfOUqvcdlzzikTS0Vx//HTh0/n6jwX1WjEhY5RWSMAErYhfKq0UK6WIZSMz62s/8eDR0EnCRJtUuk1doOYmZ37+dHjml0q0krukHYKy1QXw8f6AQnb8YJqx0C7RgPG55dW7zycpkq/TlKneeRSolr+UMjZpZVfZuZ8sZQXmx11RiBhV2qkzqwzK9uFOw8fM1JJj7eraOsFYY1SHdmokvHEXHwyt/h4dt4KQ2JppD8jfggStiUFtV27W/uH//vH+y4Lza5mfsbxhpeVhBEDybFkHC2JctOz83PPVxOb0KUfQByChO25jMs19dcff3Zmoct8blTrdRAPKVARCN/9RmsRPSnuPny8s3cAUxAkbO8VzIP/d/feUaUqI6cj77hLTJLQ+PQdEoWq4acRf/3hbt31jOLIJgUJ2xQPZxb2d4qkqFH3NMVUJwW7faONxgc2Iqlp9EKSH9b1nXv3uW91A5EIEp6xzHORQB3JB+n1zY398qPZuTqPmoJSJNC1Nuuk0xIJA1N7hyvPFy7BwJ6xXtkqzDxf9yWRIXXBcXmncecpn4MKYxEkfPNwTTy908KtPa6Vb8t79969DJ8xmYvkMr336NFBtSqE21/IPZMwNvHlACDhG4e069L76F0TT8Uezy6WDo8yK/fJWxPXfGgp7vzywDeMiq6AfeBcpr7ZqdHINQUJW2A6Memkn45qICpKPZyZFSKz3esoYpF037CE29gprO7skvpKTmDWksYcICEQQ3k3vnDpI1YM/jz9RAmZrMXMbj1xyb8TfUbcffRI004kIktSGpdMgwAiSNiq5eiFg12CpcPy8/V1qpnI9ikzn8tG68aeb+mouri6RgXKSUSU+8bhWCEgYQuWpFNErUCwwvCXmTkrDyUzYXYloY7XCjlmOA2XMebJ7Bz1VoQzBiQ8E2eFu3oH5cOV/BZ58LNtEelYAPo+HU70WUKWDo9W19eYTw5yThpkk4KErWQguQBn5leoS4Uy2e/IolNdVaMCSC5/WVj01yMqpHRTLwzWFUjYAm3UFcDqujIrq6uxydSlhlBp73Bnb59rF0L0nXWwqEDC1ghCH7ZeWt+oqpD7Srtu9s7PLq1FjTkCp5eiKxRI2BLFjLus0OW1TfvANcxmdt0p2ZU8dMWTW/mGd5RlP1QDErYLjmrV/M4urTnJulQMkp+mWlNb24Vke0LIHiRsiU3I+UZ+S0Ut7t03l9rcldeBFtLy5o7r68FAP5CwZYtPm41CMWpSJkSXz5oWRq8XdnmS2gbvKEjYGjVsu1iMVqDvPtadFzOK4HO+X64clsruGYnVARK2BMWDo3q5Qski8ZDdbvRG0DmHLpFdbxT2SUdAEQVI2Ars7u+reOJ0lw98T3pD7R2UQD+QsHUo7JUSYdDNheTJPCmL0kGJ+6b+KKIACV8/mjvYc7ZfLpMKmrRy6lrHDCWUWjLuH5SVUkljUgAkfM37fZqB9sejo6NuVkFPbk9G8Gq1Wq5UsVpAwjfsh/BLLgzD8lHt1+Rk125PdjlVKhUsEpDwjbCuCXbL12FI9OO++UrXXs1kmBQZh+UqJCFI2BJYSdhU0dPNV5Lo5+qbjanVamhGChK+ZiSF5LS2nN/PiGpN65h+sRjUjHVpS2oTCUPXdYeFDCPTQMIWWD7wx5wuDElHwNUACd8s/UDCF18rS0JcHJAQOBsxmETtcUFAQuBsQAwMggA8BAlbsfGjvV8T/ZLsWSlRQwEStmTN9fT04Do0XRMioZWEuBog4RsUgMljkPDUK+O3pxwuCEj4pkAdxHyKjOrPiVyvpGLC5DryuKap2xgoY3VUczHQB0kIEr75NeeyQ6Ts7+lNW4Zd6xukUyazUDLe29fH4omFAEj4Jq+aEMP9/caPjG5yTnQhdLwH9ffl+vr6ECcECd/glt8o2zFmdGg4LQa7uX4uiROODvUjVAgStsL9QDg3MkhWYpKx1bWLLzn90cFBhjmhIGHLeDg2Mkx9ppM1p7synS0Rgxbjo0ORWo7KepCwBRgcHBwaHqIq+5RM6LpQdZKwZu3kifExbZDADRK27sLpifEJlopTd/kFsVvSYF+/8xij8y9I2BpYGXh1YkzQ6GiupZsRzQXrXjXs2nm/JaHpKEjYSlw4P5GTfsUZ34SbGdWt8pAbdWVqkqXcVABI+OYvnGFBTlyamKAJtTQMhnfraLSRwcHxsVEWZxRheYCELYJk/Ma1y0yFdBm56dJxFJZ3Vy9d0iakrhbSdwDB8gAJW2IWan3p4oWBPpfM7TtPWxHQjSEKawnfuDYVpKZkwywECVu1+ISwvLt17Zro4k74VgxenJwYHOhLZnJo0dUOKpCwhRdOCD+pnt2+cZVzGhUqJOtGKn5466a1kF0xIRdGc7hHQcLWSUImnVO0N8hdu3ZNdmu0cOzc2MS5MWcFCstE5fYmcBAkbKEqpun757ffJrGYzvBON30QGVou5H/yD5Tm4uvb173yGeXNaBNCFwUJW8nBqNlMLpe7bVWylJBMkrlIcc1A/JBOR/l/nE/KnVgweW54YmIiOVkECUHCVjsk0vrnh+/d7JGn/0opk4GcUifltN11JIlBSzd7gl9/9AHzXuIkh7vLC0pAwpbbhB7OH8NNwMyXn3wkTiOqy6bMhK3op39G3f4t6W5dvzIy3E+iPnmB6coeHyDhmZIwNvdynF+5NDU5MZpcWLc0tbb85E4+mAyduDMFBwL5+fu33VDCE8Tr5iYDIOEZqKMs7qdS98vum88+tcyja+qUN6/CZYmB3CiXmKbVn//0KeXNUlFlUyNWkBAkbBEU8yExyhplzuob7A2++vQj6XQ2nYxMswZhBhZldDoisLvM+zeunx8/R7Pp0/MJEwbCJgQJW3XteNBgl6S0SXP96uXrV6+IeDna9Rg6Ydj5xb7aVeuGho2Mjnz20TtWzVaGJxX0VNQLBoKEZ6CbyUTV1C4+ZnW1Xq2++OzjsXPDdoH65einGrJQc5HW0+hBG4bUxGnP2C8lrNnLB7j5p6+/9Bq4Sc8hTCQhGAgSnj3q3MrE8C9ffdHf0+vXpaYBo+RXTPrkxkZU211/nbLriH72GSv07OeXKvzLd1/3BNIzjZM6CoCEbQfj1ivrC+Rfvv06Kvk9fq1lyogybSk3qLO4d3KqyPcpeM7ob776fHxs1Al847YVaxBLJMeAhG0Il8Pt4xbjg33//OevJDepiGL0lUS0ybXYdqZu3MrRcKl8Y/HAhF9++uHVixfIO5oo4Qq6J0jYjmKEuWVKDS/Ojw1beRgIxo577dMTVNpPDCoX2PRks3asfWhl4FcfvX/j6iVnwfr9RVP8UxgU74KEbXlBhdAmpAVq1/GF0aH/+t03vTmyo1hTi8Q2BI/BfHKsJds3X3xy8/qVSJhzqpcQLgpqULQEErYlFDtWP2Efnxsb+u//5bvxkQHhOtEc8+C3JyHJE2O3jV6h/umbL65cmmJxsbwThlwnY1JRMAEStqdjxkSOe05plu7xaG/w/XffXrowKVMpXZ6ish0/v5XjQg4O9f+37//x4sQYhSLoK2apUN55I5EZ81q0j9n1PK5CCxAwXmP84ezC9OysZJIqD5TnoXdCxoFvk4QudCIqk6yUV7AhkyIj0iFlVHBkyOPCT/PQup4xly//6ZMPrDXrPqRvF4BoBEiYAREZsSu/u3Pn0fTeYdk5H11rsrqrSfexfHVaVd4fDILTYYmB8cGd+M0ZXWOG+jVaBTMgM4/zPsk+/uDDG9evuMAgN758KZo9iHsIEnY8CY2PIXImqzp88HRudmFRu3hAs5Q7+bipWu/VlEyWmhvhBBulYsdvwHyi+dTU1J/euzUwMOAcS0rTWzsr180pRjdRkLDzSaiFbuh1RuzsHUzPzS7ltyVLaOAJGccP08XBfySY0WCv1k3lDsl8z9GRwc9u37o8OemiEh5SSqVU9IdGYNASSNjxsPIk0egoTC94YJ9cWt+Ye760XSha5dTqpFYztNSQLtPtFPq9gjBMN57gUWkVbxidXI8MDb5z7eqt69dc6C/VqILcvDAFQcJsyUJjAmaZxhWnqjxDDpuqYav5rWdLy5tb21LkrBS0dFVMNWmqr6aO+rC71I0EHREfRA8P9d++fvXmtatBLB01Z05ec5borghCgIRZAwW7rfwhCUPLXbIobrFTKM6vbKzk89W6ahJlaSH2Co4ZYpRPW9WW9hcuTl67PHX18mWulYwbh7vpGkyGfsRn+oOhUh4kzAr9/AQ14lKkl3p/KdlgDbuRs3q9vpHffL61v13YqVaqCfH+CBnsH/YEYnL83NTkxOXJ8wODfTntMz/pM/gjJyYrJi6ChO2oRiYuShannjUbeD7MkLquTphEJpaLab+0XuecqGF9d28/v1PY3S/tHR4elMtUv/9iV02ktfq8lv6B/sG+vvNjoxPnRiZGx/r7ekgCu4/EXs7b6WIp8bQJwZQVp6HfWdwBuW7aIFDaCxK+ZgZGQTYm01LLldj5WRRpGZUObXMfkXed8X2O5ct6OOh9o/xMH94oORpW9o6qFQ8rMLXRybsrZ+2J3iDo6ekZ7OsfGeyz3wcGB4NAROI39rto9uoZZ5FhKV2vY+e2YdoFO5WmKxOFNAxnyGgDCV+/JGRJU1GdZki04Dwbm6WBbvgWX0GTTBP7pGGW1hijrE7dPBQpGVlzql36YpK8+AMrl5weMB2eFHcU+YRH52XtduC3NcOT+h6t0UC4Lyq9K9fq+cKes7JiY88udxKMr2Jf0XGMoApa+n6ynQS5T+jt3Abhv4QLchjfbVGdrNuwL/xNhjQRnoqznGz3n8E+sHKYicA+Dli0HbgyX5+Lc6zrB/A7EOAS/A610JD2RYmWkZboe/7SYj08LM8vr86vrFXr6valqU8/+0iyxAX6isFuZ7PxxjaZKLo6dqU0qOLfRTn6NWjmfhUX+1lpnXAiXWT8+68AI9npSw0t0x4+nVtcWr508cKtG9fGRobtu0u6JMZXBBs4daCOvt4LdCJlrOF/MaK4X5pbXF5eXQtZFF635tu54aEvP/7o/OgIrXgyDl827E0ZmyyOE7yUq+OYh0jxY3/4xxJfjqr1uw8er25t6Xg48ZWpyZtvXbs4fs5rBNq/AaqcQMLXCvKpJGE6Mofs96Ny5fHM3PP1dWVk9BrfkSXkgvS9j99999133rZCVDD9Cjah0+5SxEsoTIksJ18v+Sl6LwXfT9Lv9ziK0kYppXGvrW/98GDaSntqk+OGw1htQCt7glMXzn946+b58XPJnyDXFCR8zSRMC6hQmZmZZw/m16ISpOMGNkkA7fXJyYnxz95/b2J0ULil+YZd9qlOE2kvrk7pqMde/FsiMV2aXKvV7k7PLW/YHYcT8cgeTjtvLTPfunzpo/duDff3cKW0gLsBJHx5WCET8Kjkx8XReMMx4zI/ubMM87u7P04/2TusUgvDX7ejOKWA2u+3b7793jvvDAuXLRq6RSsjSsSJKSyV1R0xR+hjzH9NOdx0IhHBfJyQYpheTJpIYT6eQmAF8rPFlenZ2XQSz6kHp+85yT95752bN64HxjVlC3w5BiUheCP5zW9GIGEGeJgTUsfrLV33YJfUz0+ezS4sUlv73+xWGPWAcHF81t/T8/5tuzKvS+Y8llacUt6MSxM7GTQ3UWF+Wol95WqmX9M8nZOTqpkoeMgdIV06a5zWY7hc2cw/W1jc2d1znZ9emBtgUplx0uiLF85//vGHQ729jfYC5KZCNQZI+JuyIoqhpRI7qbnDXungxwcPt4sHVAjvpOKvRHeaauEp0E/fx0aHPrh5w+psUoX2mZCZKOOE3os3CJ+Ww2mtMkn7flnHUloFjdji34LSetLHpCuws1t8PLe4mt9OqoFffOniw5ITyJmhvVK4LolTk6TD01u484XDBiR88WKNZJSRaTEyt7r604Pp2OnXqMH7HYvSJIcNjPNkWBpMnDt36+rVa5enAuGSy8hxwn1pxTGlNCUxaHeIWne/qvO/edfwokkaoY7L/OcbW89X1ta2t/3HEH7Hse+uf627YZK3wFKdVHlcKPzBrbc/ffeWdAMCUvIQAAlf5NjgjaGzfsw1/2VmbmZu/gX62Avk6mk/CgpjjAz0vTV18a2rV4YGe48FIYxo9DVrUvl80OIPLeJYGLpD6airjbMGmTyq1Vc2t+ZXl4u7pfSZRmPefo/B6VnHYkI6i5cF9uDXL4x/++VnbmJc8isAJDz9QpCLwm3lWkqXGhIa/dO9XxY3ClYa+DCD1ClLz7xQEiYGUkK/MLLNolXt3fuui+61i5NXL12ampzszQVNmaivBafJHxPLV15XZruw+3x9c20zX6mFrgMVMTOeUO9fJ1/AxEQS+vONXh/GGiwlHEyMDnz/5ecDPTnnlIJNCBK+QEq4RDNvv4Xatdf8648/5bcL2iUVNTc+Yy9Uz5rK/6KYuy+Wj6ScYXGbs6jXS19vcHFi4vLFycmx0b5+V+uQFGH8Qf2tiYSklIZhuFsobG4XVre398pHFGNgLEoGEkmWTKOYWL5YHNK2QzOJE62BztG3sNLDPfKfv/t2sH9AsBBrDST8DVWNHKH/5+93Nnb3QyF7TRjHzSX7PU6FY50LG7R0fnqTmgbTqLJlKiaA5W1O8vGJ8fMjYxfHB4aHh/v6+l6XEVULdXG/tFMs7ewWt3YLlZrr7CTiD/NrPlXuBB1LIiunnG68m/gdysShRXtokySpUnSxV5h/+fbr8ZFBrLWuJ2Fs+1FCWbpKkFaM5dz/vXNvfbdoV1HO6PoZhbUsaXuD3OBA77nh4ZHBAfs11N/X09ub67HKcsSH02MP1jRTrFarhfV6uVwplquH5XLhYH+/VK7X6y2bIpjuypG4lyz+9R+/Ojc0Qq4gckolVx4k7D6Jd8IFQoro//rPO5s7e9ECcm78tmiSnZCnvzfX29ebs+DOu5owSnn3qdLKolqtHpWP9LEMHtH6D5xu3Jh8zp5A/Ov3/zDUl2OpiEWXhy66VB2Nyt6YSnyhAXcM/Nvd+6v5HVIUvQlnran2Sb+iWb/q1MV90i2U7i+afj07o2lQ8aeV/b3i377/h96cTCxkJWQjQ6L70KUJflFPCucN9aYac/Xgd6efrm0VjC+Z15G+J9rkJvmv0H6l+ZNmV5NDNWmp1vT6dJ+OsxLph7Xwf975yU//jRIkupmBXUpCCnwHvFEga1XTxwtLC0vLscfExC1YxNlSj4bmxtNFxUmtMpk3erI7U/xYnLoHncnGx6JqD7GzV/77T/ddQq7PpJHdHT7sRhJSRyZtIl+54XJ9e/vnJ0/cOLC4bsB79s72xnh1mDeXJp0q9xLKBUJIJklyStcDxh0nFqRtoYC47c91/uBL+cKjp3OROtrdHR668eRlyp9hZctBtfa3O/dcLD4Vgn9xhLol4jrpVZGooyww0VKmbvYJFUXinnGp2FpHMwaNTs3obhO/B11hYVyB4sP5udXNbdcUo7sj+N1HwuNmnpUt//nT3ToXUscJ3HGCKOV0nd3nDKjHzKlEahKGuhPahCafOYwucqiE/I+fH5TLFRoOBRJ2j09GR6nSno2PHz3bLpZFY4du7NYnGdtiWfibqt2pTpqzNfx+8wNrLpI8dfvAeaTv3au7jHnK0Ylcpkm/LJAwm14ZlzDNFBdmc6c4vbjg65KAVi04o5NUIRKPu3ul6afPojlsRiUZCMd6k4OE2VNH7RqoK/PXuw+07DHohtJimzzVOMMqosrwmbnF7eKBfUBuUsp3fbXZGyBhR+zEFM4W9x4+qSjNlO5yg+Ss9GxKJ4iaaDH2w/0HmpKUjhdkgoRZNAk9rCI6v7JGE6F9S02gddefxTnriUZqvx8cVqafPFOxoZuM8QAJs7gNm9De2r//8tDqPoKMRAObsIXXPy69T6oQ42Jf8Xhu4aBSDV0tsFDMdI+G0nUktLf20dziYbkazVExHPP3WiwJo7IVb/K59gXRUG7XWuqH+w+jTnDkHe2O+GHXkbBWq92feepD8yGV3+r28+ZnmYQm6h0cdXnzfQxc/aHzj/HtQnFjfbPr/BTZtf7jHp6+fZiMC5fuTC94S0NjFObZaCK+S0jaPqd8XeGaCit71354Ouv6v7q5F0p3h5DI7ElGWWm+DzwXJmTKPigeHK6urTU1ngDaw0wwlK9UOao8WXxOmipCFB0OpdOVPvT47pNn9rvr45TuzAe02Yr85dmMCq3qYl62ySpI2HaSkJiWoLhfym/tshPjr08tSgBafsP80F/fzifU7PHCkuKMC5Cw83noZjrEnu77z55ReV7inWvSXYGzXIgmqvNkVgvV/OnCgut5p+Ed7fCdlVqJUnnuzt7B2tZ203SHVBsI4KxtQkMuU+cvDQSrKP10ftFwBOs7XAyGxjURdVssE49nF11vtXgESqKFwkPTPveLJq6RHSEZfzy3oAwkYWfvrI6BbqSZYYdH5ZX8FvOznJtuPBjYJvDjx5P2k+4/q47OLi2DhJ18U6mVkx9F8mh+mfqOpc+XN4ro4SNtizumUymj2g8FeTK3TGHepD+lfRByARJ2jHpDbSxqKlxdXY30HCz19tVcjvmoSSmt1Wqb+e3mJWuy5kjLLgn96FmLpbW8UoaG5kHzbGubkPMmDcXy8MnCknsmnjHqu3ZrxQxI2Bk31amjPHi2tKy7qTgtYzdxc2evVKlk+95l2DHjPJ+7e/vF/RIlCsP264i71qSgai7mllcbSYgm0khBwk64nS7ky+ZX1qgwlAxCCMMO4iFtmpZv86srLpM7rmzSmdtIs5wxY3fRpc2NJBioGJccJOwMyzDFRl05qmwW9qgjs8t/MvCOds6Gur21c1SpR2Y9ctM6lJY+YjG/shJ4eipjnNM7Wzzs+JNJKyduNB9npLrYXXNhY5Nz6VUa4YepY0l3mFRkvges3U838rshU3U3QY3FY0JAwvY8GbLa3axrrQzPb26xRqJ2+3SCB16ajfV6dWN7R7A4H1ggTth+xGv60d6mnd1iJayfyA5FX7VONS5W8gWXBqx13BgKJGxjBYb5mbsrLtOiMfwsHv8CdOqd3dguMD/MxzEwW7lPmSJhskHaB/lCQcXDBvXx3wKdiIPD8n7p0N9IgThhu4tBN+2sXCnuHYi4qS/qBjOwt9rbt7q1m8kmiJ1PQu+tjoqy4x+3C66NhZs3mBrgDknYoQzkfnirva8bhQIFnBCiaDucSKEQxeIeO54TnJ4EBHSWgpPsobv7pZrrAJW1+9j5cUKhk2GDxEbJ1VqpdPJewivTsWs0mj1cq9Z2S0eBgmOmja1BqjQrV2ql/RLWbvaEoX1c2Csq5I62s+FOduDhwYHGxMEMQacakezvH2ZR1Hf6CZC3xc+UJCoWDg7hCM0SaJOl7N/iQSl7Ldgy4h11iqgvWbJmYbF0CEdohpRRnfZsl/YPwjAECduWjJHGUjo6giTM2CpNbmhdq8OjCkjYvvSThgnJDo+qkIQZU0e9MPRdSZk8PDwECdvUZkgeV44qAgOws6SQpryjodHVahUkbDubgZlA+qRePwTND8SGJMzMAnU2v/YJwG6t5hg/rNQzNrcwQydjhHEtY11XC8TlMwOdKoIhladWq0ESttlNikqUeNQT1kARzZ5BKNOh4Hq9DhK2o8GgfW81ulWS6wDR+qzAZ/xqGqBF7Zurqq6z1Qmfz67nO/4cmDRuMG8UuA+5EK7kDDppNlaoPpagb++syxd2BfaZOcUgCxrL8c4/gdHSaIVIYTY46FupJy0tfCa3yFiXkiCTdy50MyfBwkzYS94rQw3USTC61CgDErYTGq3RdVzNxDXjHA0Os4FoNBpnPO4Q5Ge7ZqoTfseTsHEzfGBCePUUyJAkZOkGXdGP6DEDAABICAAgIQAAICEAgIQAAICEAAASAgAAEgIASAgAAEgIACAhAAAgIQCAhAAAgIQAABICAAASAgBICAAASAgAICEAACAhAICEAACAhAAAEgIAABICAEgIAABICAAgIQAAICEAgIQAAICEAAASAgAAEgIASAgAAEgIACAhAAAgIQCAhAAAgIQAABICAEiISwAAICEAgIQAAICEAAASAgAAEgIASAgAAEgIACAhAAAgIQCAhAAAgIQAABICAAASAgBICAAASAgAICEAACAhAICEAACAhACQWfx/AQYAF68JwinG+J0AAAAASUVORK5CYII="
    logedIn:boolean = this.loginService.logedIn;
    // @ts-ignore
    img2:string = localStorage.getItem("avatarImg")
    checkLogin():void{

        this.logedIn = this.loginService.logedIn
    }

    logout():void{
        this.authService.logout();
        this.router.navigateByUrl("").then(() => {
            window.location.reload();
        });
    }

    getAvatar():string{
        if(localStorage.getItem("avatarImg") === null){
            this.img2 = "data:image/jpeg;base64,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\n"
        } else {
            // @ts-ignore
            this.img2 =  localStorage.getItem("avatarImg")
        }
        return this.img2

    }

    ngOnInit(){
       this.img2 = this.getAvatar()
        this.isAdmin = this.authService.isAdmin();

    }




}
