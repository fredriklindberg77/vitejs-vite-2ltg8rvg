import { useState, useEffect, useRef } from "react";

const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAABCj0lEQVR42u1dd5gkVbX/nXur4+SZnYHdAWSJsizgE5H0WBYwoIICKlmCYAAVl6BkMCJKFlRyEFHEJ+qyS84ioCRJC4K77BKEDTO7E3u6q+4974+q6q7qruquDjM7i1Nff/vNdle4de65J/xOuIR4BwCAUDgYIPdf+7/wnMMoPsj9kkouD7yWPA+C/1lFXyLob5QdRtHdil4KZZ9FIUOq+Nalwyt9WQTdrfTdA6mBoFtxyHjcv4kCRh08O4FkRNDYytOz8KuETBXuSF5aUPjQqeT70jFRCFHCuDNsDsoc5L+Eyp5Z+l8uubyIP8owcfTHBS62ihQOuxVXSasybFoVnTlkhBQ2GC9j1XxQ+KxTfdxDkV+4PBtx9WOgurmfGkfMcTqooU/3yR3RiPEFSiZ2P+XPj37n0us40lXBJ3B1j65/8ON7VW1syvU9ncrcVoz/WKOIgfFYzBRu69D4CIaJFDYRh8HjOUIuYzCICLKRQqzgKO/ov7xgw1HjiEjRWLzISnDfghvILhzB8KII+r3UJK1g0JQdBlUhkKgibUvfgku+J9vGStdIWarZMApzsupfoFFYtojXMckOauhNiox3qmatUjVChIpsLAmZHDeRTjWZzI2T01QPg04kr9TxOKayV1P1r0aRl325W4kQyKfh/gXVZBhS7SdQDZyICOhRDdTiSmuMq1T0pdZF9AFwBFMn4uxwuNaGKIvj1ewYeqViEWgU3VAo/5IcYpg3UMxE88aphrXH0c6swa0mv7nD4R5MlCUUhtNyEHtxoMTiOiYgzH7ioP8i3MYqA1HWIzSo1qXCEYZdJygTZRYb8sQy4+cq346jsISoXgehrLcVaPRRNPoGBjcaK039d+MJM+C50txQfZgfhasOiuzZUJDhH33qvdopwHivOa5CkVfk+KBckYxN/yOonruNq0sYPV5E4RYtVcmaYfouSvyDyuNYVdluUeyAwKBsROSpnqnlakyWqsTAxHiIHO3VwoxRrt435pDpY4DBFc2v4gFHwbEai8FQg+IGU0d5+tQWnq/tLAqEG8ZJTtRzTvj5/F/DMFGDmVzWn61K/lEDxyqqvICqWUZUE0A1OeUXTboHUnl/1psEEF0b1moccyTGourXUZQEpogAFar0YhrLE1SrAJkkCpHCPXGqdX4r6jQuCTIWGIvqs1UD4co685k4sruLCGStwTNqnP4fd67icLihtoFSHevNgRtSWAcOeh8NrSolR+PJheNIBdG4WaRqbKlqtRhPLLeNKx9XlWPIdb9IVaHAMuqyuhwCMc7TUG0eZlVU4IYOtWIdBE2I4KQGLW+KnKEU+OIVk/ErmM7+YopGchjVRzKqO/8ajc5tGo+b0PjwHDXoFaiaiaAyqpCqWdYRZXhp/RBXIzZqE8vRfc9qNVdtEoUbYe5w5CFxhKdH9584cnVQsCoMjOfXnKxTs8VAlQJVFD5CGk/JRGVFAlXPf4F1VFS9eAtcsRyeKkJVqgiKsEKKvfi8KqxT4FdL1qqKqBpbETBOdhJN7BOppgVQ/7RGFdgisiyhaua+otDmOqgXJc2tKoegIRPPNf1U8/KL8jiqXsNQJXFVZmaLbazoUt3/K5efKqpMjorJ2lyDFcJBIroe/78Sp3JDmHI8xHAY4F7RVmlAWkcdACk14Iw6nOoouqARfi5VGu1EY7c0ngSvufoyIB9r/EISHNl9q1ZURFQuEUOwZTUON4pZqUHl+dGDNhTiMHI05ogSxg5rGRIAN9RGQaoeO6mN5ygC13JQtn+UpUaVkAsuO6ryxkq1iQbRSRSo7AJbAIU5nuUJReGFRqHtaBoVK6SakIiaz685r6FRuHZDqBHRs27I06kcihRanEg18QA1EG6YSMe+gXDU2hpDo55ClaQLRUqxqtdcDliuESUWjY9EaZQnTJObS6hBF1KVBe/1U7j2V44YhOaQsUaPMdcW+yuP2ldbENdwgKoqt7+Ga2tuMxQ9hYHLOltUpRNasLdEZKnDdRAI1VfIrMWDJooLq3WiawgsUshURuS/6C5kQD4Wh3PSxBN3MrDLWhx/hEczNeK2FFmAUTSHlIvWhhgHgk5A3lINOf9luvlQgx4xaZivOlulTJSmhqAFlzJWA9+c18asVAwCVmWT1dnkslHASvkTy5sxDYyBRoxzNDiDNLopStXfoGJ9RLWRWpp8cgW1dqmo2E+7qMUcVdNqOuKiZQ8ey+PEWI2qCfHeoKKY4SqVL0ebVBp/dqSQSarzniGOXtSmmBXjZhSio8qFdOpc3uyXikH511TD+o4S2eDGyBgKGxLXN9kULsKpodUTeYJxeCP7sJ0ZPL8SlTXzUTZDGKjUu4HGbXVGj1fUn+g3sS0qaxcwVL1tVNbGIgryWsJ6D0Ux2iq6NT7GStY9T+ULv6iSo0HR1ET9zEF1rId6rqr2FajR3E7hZmsJ21G0YRe/YvHJDS9YpQY1B5w6xo+GFE0u1KWURUP3IEGFFBQqL58qbtJSA/5E68hkV6nmKpp0Ph+QPHKFAuaCCEJAGjBizn+pBizDp1WNsvImbEeeCOm/5E0sdkUul3FeSu9G7k0QYnWW2bsLZSvA6m+7GqWci/x4dP0xx/JvWrKAfW39SrUhQZATLFYmslkgA2jEOhy9Rt5WmoHbS3nMdsrvxuA8r8jGKsoFC7T7KppEVJLRGy5IKMwIK58YWbqBVtgOZBSSBxexoUjEBp5lxDMF2eYUtMUDlVC+fEZekRxyTy4zfFsyCQkSUAq5DKwhWKNIxsQHNsEuHxdHn0jDg7zsX4glwRxOgfLbzdljcvYrjKhWKXymw14+8Ccqu+Eg/KcFSgKqviN5VQKpnoICqqZ9bXTJF2gwlOwLWWpWkwARtIZpQo0BOUBQaydmboFZH8bWO2KTD6FnE7SkRCbDB31Q962BjLmMFQj1cQiXs1cVlkpsqr6YKUxhhV3LIUVjVE1WLlXaNbM2lqofVeJKRkUZ57/ibYv685KHA6iYmZRGLgs9BpiEBHd306YfxawdsNX22Hg7dG/KCUABWSBjIq7xf5fr5W8i3QNlldTBBvIGBxkzbDNW6XllCtPK72saUbZRJRidQwC9wNVDlSa1Dry0MbY7+Vd/mQVQ06om8jOTwlgWGAMUySQ22BBbzsas7WmLHbDB1tw5AwZgAjkgozGinLEIQabJ994KkYbW/jGG6Zlymsco+8JRTFQOUXxhZiaFm9UUUuZfnspcjT6qlpmovm0HvTuNlV+iFL5jctkBMIMIlgWVBUyAKd6ETTfBB7fBrO2x5Y7YYBba2hlgExgDBhVYgwBBgICQAKAtNEl65j79+ktItIMtx9jniNYCPNsEs9crpBAlFSiruaz7Ex1K8FPfGVl5+6zMcgnb77kqP670u9qsIv8gmSMLtvJucthVmjqnoXcjbLgJzf4oPvhRnr4lN6XBgAlkgT4L0BDkGO+QJcMUJIGF14EBAVglOC0H+kllApFkBPENhyw7VOoqHt3mKFmRzEGiqzxwwEGGUcSkIgqtEuOa5VMZXCACiZiCVnXZjattR0+ZtNEH6KTzePZOOgusAXIKORNgkIAgSFFcQOrlW62RMOjN1/jJBxBvgdIlS7jMdIeqHTtWGD3nphpDuCiQSXkYoqouKGVhwNCSNyqb1tfAdKX6kVgKQUk4artiEeO33sD839CLT1BzJzbYlJICOYIkkPBgUSGIiVJolbj9Mv7HPUi0ghWYgwBSitBUJ7jxGsIRVY4G54TNd9jcczgfEIg8CE0RrEyer4PmgIri86XIHpdF4KjeRRVKmXDcjijEL/FfSBSQ3xJLgCQvWcT33SpefZTiMczYoqDy8jZGQKsyhjCEOYRLv42RnKOOiTyAainpyoSGCwM2yvr8UURfGRYsA6AF5gyV2SvAzxCMshn6tlkTZKj5/heiQxm1Ig7lFV95Y5ydqlGmChdy0E5xrAEg1Q5p6CfuJwZ2PQCj7HIhe6w9l9Q2DZVCq6QH5+u3X0e620EZ2GOwMgVFEQK/8Q1V1O1pUzgLljhExCHyiT0/eZcXB/dCKQPrE3ywNZXOSv5yHh/VVvFu4RTjGqJA7MshGx2kTWbhe7dxNg5mMIHZnQr3zt5vWJBmvvMGIAbmwjmRtgQM207H2cW+/k3bKgWMC7GnIhUW3k3AkVCeBUceLRCwa53nEfA8hYNGxVEmvoZcYa7EnOF6hCq2ewy5ljwqUilKEJ15IxsdyJmAcBjFyyfac3vbbH/taf3Ck4i3QKugbjMcbcerYmvEqDI8UhE0Ilcy5f8WIRiN/yvybjHFjrBxPHAu4SEOYga/GaG5eAKIyiK05FmyDYFJqbCiink6hI+JA7cPcenjXT9coBgDxBAGxvpw5nV68x3Ql4VhhIgSz38VUxJ8zw3IjSHdDGWFc3Z5ZyLgeyNc8FL1BpZnju1baoY5WuL7RMDiC2i1l+5eMUyFHkNe/svPYizm3CSPD+VyjhYgL7zkIYqUMKSrNKlg3kZcV0XD0wpZyzXJSzC5gkgGAAgJIR1TKQCw8L8Io8B/9r1lHKPLxReO5099GSuyMAzosjiMTS4Zw8rleGQ+jBYoFS7IuRJSWLpNcyFtJgp0zpWCa+Q/nZFI0KZb2Co9b3gTM7O2lT3ZpzGzZ77JNS2ZmPLQnFd02SRmzQRi8psoDCICePkKKOXRwky9vRyPk86LMnIVAwGAZFozxIODvrYDHBYqCDIv2EMErSndgtYOVgqSoF1RxJbnCtfcEUQjQ5wZQSzu8FYRIElcQnsuUFtKjK4WH9oNx13EqywI6XIV+72cvHdCDsrQYdBDt+n+d5DugWWFiI+I+xcXP8WI7BKW93T8Bqkdt8qO0Mwt8KsnYGqCLoKWS7wwdte8q5KIKM9C7MG/nDM8EouZCdC2XmASJKysPn4XXv4WYgnnMq3p7Fuw6TbI5Iik86r2hBFBWeiI45ZL8KvTkeqGMt0JIM8URtGSrmBmjWTc+PEdVno9ZuU4EQxodj1We/AaWkNKGnoHp32Ch4actIKix/km1+MJMUEI5LI0rRNn3KQzSegchHTXA/mtDoLSbhIfA4bImrjrFlAKWoeIY45g/wTHBoyyeHH1Jjy7vGA/ThNnCSaxL4xAHiKRV91wQfA4y5RdnVhKZ3vlMRdpSWYttUlcauDrBJsxWG52Gxc8RiiBXJxULBQ34aLUxcBcESr4nrEEL1+qfnMGvnMLVpkcc50kw78O7dsqpTeeJY79Mf/sKBg9jlTLk9FnWnmfQq51Okqn3qo7ZmIgBymhubAcvSampZGKwQSUgtZIx+nFB/S/nkWirRB1Dt3VO6LXQoGV0BVbHZc32TzebKkbRt5W9ArQjovCCmz/1/NhDVJg7ZxQ9Gvho8AKpEHKvaf7IeUxuVzOYA3mwiOgAAVSIAVoELNkj5NKHmeXCzhTHqEtDgr58UNtIdml7/0tPfhrtMdgmWANVtD2xwJb0JbzNzFWZXnPI8WeByKzCtJvd1NQvp79lYhhbBUd833e/lNYnYWQHp0LMIHdCGzOQnvMePR6+a9HkRSwFBnge69ntmOIKOv3UVnPNNgGFRF6gUTsVeTGkr04U7Dl6Hlh+8OeD9xf8yewJz7tJVnh9ckfjScuxYryPMF+fNW53BYAojg6Rv659WjtkG79XjtGI9bGV50qVi1zjKd8ZgtRcWa6JB5SfOwlNK0XuQyECAqZ+J9oxJBZSbt/Xh94Bq/KQUpfO0vtOd1UaEqIJc/pi4/lx39PkiAT9J8l/Pf7EMub7exvhxmW08cRbCGfxKq/OVhpLBkMYvYiciEfH6TKBQPT6/8zO8TygX6BHMwhBqH3Ki6wLzurnLxgUoHO5fcwCt9eS2sYce5fiatPoiYBVTKGwgAACORMbp1BX7+QrGGQKEC7hUs8nqA0MDZIM2fRSddgUDlBGPsc7XKV/WpKwzBkZjl+eLDWSX7qXqxchSaBR27m4X4YcX8ookyOaGBELjTEJ0L2sKwNFSweB+V1IErYCIHsxQV+Yg91NIozhJgLE6/9Fi57m9FTSfqHvaDJP1XsE4rkqm+HdKVcXEZfeP5UFlJd+q+3033Xoy0OU/mFq3+9SQNrsrzrgfj4l5BZCRkrweHcOwuCsihh0Om/1tQBUwECrpL3AeuKoSDSmi84Qr+9BKl2fncxvfyQYPD9v4VoAit/QDBsKsNyT0Jr0EVEyVYp5Oxncy+X2FOo4WOUALnFAeu4iOe4iKWC7hYWDsjfWZPH1WeACmNDqR5nD89R2b3a/Jq9cBOFWBtfe5pYsQTxOFgFy0L7SyF4QOGYC2n9jZEdhRAhz5HIraZvX84b/g+GsiDpl1IE7Up3U1NHjK49Rf/jXjR1QZsA+Pl78fpD/M5riDc5ZjujmlQoLmOzhzFWtYhz+T7g5KrCEiGkSxkrr+CC2E6XcJuXjvlghWvTB4yQXCzevn/+cs2FG0LWvk0X+ceX91VthTjQT1fNEymCBbD2iRYNj8QlmCYnu+n4S6BHPVlGnsiMjCGzQnxxHs89kvtcLLSItvbb5RS1J8Q9V6s/XoZUNywTWkO24JmHcM0ZkE2AKonk1hYz5VKYtCHdZkoy5qhgpUPntT755ErBnNLQClpDayjt/FH8UVAa7PnGdvGYoTU0Q3PhG9ZQugTYs8Wnd1kHSU1f1KWammAuzSGxHQJyFOITd9DdV6MtDksXk8I7TmFgTVZv/zn61DEYcz3E/A2lgdF+8T+744ifcZ8JKV0P21UL2pWvlkXpBL36mP7FPMQ7wS5BjBivXqVffRFGEloX/K3gcBOq33qIi5D3OkP3BezSeUnyRN8YxUgdeRAvGXPYOwzlLgOucTD+Qkh5YdSCq1e02ULeRXDEhje0x37oCFWmKRflgyuOdeibzhTbzdXNm8M0Hb+vOKWIQAxDYLWFI39GL/6V//MWYikHjhcCuQx1r48Tf61HDLAFHVgJDGgFI06jb+Giw1lJxAWULgSypIRhQGtPlSlX6jhatTYzGiSx4LOuPN4VMVh7wVcPITSTFBh6C7nVYCIGC1uNCAcTL8SBhHN7mUfYhT/27JHDJKBzxIp9wRkXzdaubc4o5NozhWz6RyE9JstCMF7c3F4/mmHEeLBfXPktceZdOhuWu+V6xFpxql0cfwWf+SlwyhOCzdKJ1+qmjTCcdfAFppKIK4NJJEycf7h+9x2kO6FMN7Mq77GWBqwQbcfesKKHYpjeqNKeCKw+KIoBsyeC6zGD4PHCyM0yazPoprP1wpuQ7HCj6wXJUUi/IuHYEfmaCwcaIB9ADRAJZjATLAuGp+qSqKCUiZx4CKFgv2uXjQI7CRJKctLDyVLEjpz3EDvV0/eKu3+OvedhdRaGDMC32Y1JD2R51l5i/2/pP16MVA8INLqCvnIxb/0J9GURM6D9AY88YS1NXXFcc5x+/lGk14PKeWK45M/6qrjJaJSSISopeHTKv6ooFgvJNim61jdcthV/Ub6vHXK2MXCWUBI6zlogAKBkbwCn6N4oAisZnLeERbHD64grJg9O5oEYdBA24cMFywRzuDBz+SGTPwZMgFaId+A358ptP6baZyOXA0lXcPrpzAQpud/CF38gnntAv7kE1ijteRj2OZH73LhNPpRJHuKYFnUkxN2/UAuuRKrHlVWBWVNUMSxTSfEFFrdREY5VUYly2QbuIXnAAJQt28kxLXUhnOMEbNgDeTmfPH+yB7xxwwTkj7oQFT5CQBAEFSyYIkXjdcv9IylIrDzK4ANaSzNDAhOp2a8Ei3w6DWnokTG++ltkWFC2eceO21uISNl4AUFr1k047kqyhmiTbfHVX+l+CyBogqKCv6xdRyRnUTohF92vrj0ZyWkORoUiHI4DstnKteqruHFVYBCCRDXFOeHuqDdH1JuUbbOUyrMUFRCBfHCPdcAkBULqHPSr728uYBYlxgF5OUm5Dr/3S5/yyvtKXE3SiN+jLBkClEKqQz//MC28iGzI1AHS2AfLaRf+GM7xRjvRoT+koy/XugWWBgvPevCcbCnEErRmqbrkSOiYT+5zUZ0g+X2Z8qkrETuRFrOKKBtyjtIjhEsipuRLiWH4WMr3YShPQlVeDVLZjj1hmcM+GU+lNRysvFLTlRPKI7QKy4wq9Uql8FS4IHlGnniXNhHv5Nt+REv/iUQClirEYRzxw+6/AAlebeq9z9K9u2LIAqRHvnrXhoYWQmbwiy9x30rE09DKn5VEZQsnI4BVVF6tccVYYVUbGHNAfLRgWBBDQ7FP3eS1oUud4qYmRP54VElIyJsnw/mMNvZYkPkAgN/B0xoasNnLG1PLp0Qw+VGGojavFWkSGLco2YOYGVLwmMnXHCc4Cy2gtYelGJrA7HM1RkzkrIKTUURDzTA1tRh80zf1S485bqAPSqg4rTUAdZU3G6+20Q8HfREi/EFBhPAaE4F5f14pEAjfccF0YC5OVaAQHycfXPLISx946yuNqmhxlk11LEp7LLqJUki18WtP0sLzqNWAqV3B45Hrtvnl6EThkWpc/KupqDVB917K91+P1Hqwcu4T69n7KHo8B+WD0PXX6vjxx7zxq1xrNEAnMll+Dy8f8WX4hFNpRD0POhAVOsoVbyzqV4e2aVWqnRXsYC17c4uJg5isYuwhaMI4KAtFW0h06b9cQIv/7irEvF4rdTLYST3Vbjxeu3LXVGhK0Gv3829ORaILbLrIXOBW7VRWi9W53VBwn/eGdO0hv+IgZ4IKEqvkDwZpmz8kIAG7ZYUECaf3nO0N5t09uxmBndVk/0QCJJ0/vPPH7OEPAMRFnKSLHUPSnmu5pvUcSn0OyOERxCbjxm8KZMC2QgxPamRvLqOrMS0LsYQcWMxXHMFIFFiqGF5CUDJMFHapfbPxhiDvXgs5jx3koVIUKkaKzWk7DS0DVsgNQVsuaOnBxIn9o6bSflPeTGdIAzLuplgVlYO6zFTaasTGPnwWZ6mhVmdD6CL9CCiFZKte/LS44wd0wE949Zgvd7RMapLzChqQQo7wL7/Eq/uQandQq2JgqeZND6uNYmE8GMvvxXHeNyTHF6NAGFfyiMbHzqWPHAchAO2ksZc2JHcKHwgsbKyLFBUXhmmLmhN45EZ+5HrE2xy3yJOAT5p9aC178pACciKqTXCgSjCjP0LvlMqYSHTxgoto1if5A3MxmoWU5ZihEAhiKE1dCbrxGPXaEy4WGh5Zqn9pVMl/Rt2Lz//exH4XF9C6OI/Pe6us5q4tMW3LoqlhhGANYULdTqBvA158CNoECScnhAvmFzuImkc/5qF77QK5wbBwFEM48gn+OhIIYjboN98Upz+h7YIZiMr7/WiNzgTu/ql6+NdI9XiiYd64bclK5vHirIYwFldWhfAsLO2m/aC05RMDQDZXAAuKScFl92/yxz61BSOJ3FhxjKVgvLs8RP4oGzkmF3FgRhLXvYhDGsQ5YUqFRIt+62X5pzPooMu5PwuJgGJdb/SMFZJxevY2/sPZSHQ55Rgc2DKOw1H18eWwcdtWjvIVduS6MwzFHmSZC3A8C0CCZeFf5w/D+RsCLMECLAoGPvJ/u5eT9MGtxMW8XgLPFpL+NFg3fK8RBIUXuZjHlIlkt77vl/Kp25BMwLJKSOT9L0OBJOivv4ayIIwShL0Ie2tg/8sqoAqj4QxVUGbkmc5iG5tKhByXbBdQtOoCI3fwCQDllhk6kIQvKEZOLRn7VWEhhsgTs3m5r/yVbW0IbSHVpFPdsNjNC0KxFqOCF8KjLD5/kVjyDz02BmF4k1AjsM1EaEPRQCb1G1se9EhzgLTwOtLsDVBwARTw/quCEGfvvwo+uJXZt8MH/JcXbui9CQVEPxu2sxMXr6V8SgIZyK3GQZfxpntgNAsIKC4WV+z5hgUyWd22JT53HswBCBnQl2EijnIsLGoV7Ci7lQN7osL2RDKs0LLTPETpx5nYhzZpdqIxpVzlC2n7h0QF8cla+Fi25ENegZpvvMEI33iiKolA/nobd+2JODIrxNzj8OGjeXUGJJyUmDKYlgZI8pox3uFYsf0ByKzylPR4nhVpVVAd7Qu5TEC6HlUY5DEVlYSDHI7x6TIKMPbDAjtFXVwYQT58wXoh7dHEzAWnwZsR4MuUcmdRgZkiv2DkDvYF0I0LccNClrCBTD9ttit/+iJekwMJT25nxTllHlL02cto8d95ZBDCbShSKMHwdtQJ2wSgIdZ9AJRffeO1Clk2JX6cFZTUoJ2SNzCgNJSC0lAWlCp8tPux3G8sCyr/sb90/6stWBaUKhAXRV1IKEiTsrdahgJ9saIgNIeki3jzB4vjOSHLRkiYWdHaRQffxLkEtIItU4t1dNHH7SzCEtmsTmxA+11M5rBTxm0nxxbSH8vEcMqXstUWZ/Tt/sU1asLSxwd3qWGnoQChOHZml2QZSafsqvwWQBX3bhJAAjCS/hOCbKzS+2p2+jkU3ZoCW6EGvbOvcRyFSnGv/GNAj+Cg3+imTTEyCmk41QGBTkShk7EnS4IkhkZ56wNp5zv5iZuKYdIK1YJVCaewjv+h96/fK6Sg3d48Xcscm9qfQev4YgwpadWLNLbcO85C9kqJLC8kAJdE81hb1JdA/+ssYv7mtj7XD7q0z4JHjPk0IArKlKPApGFb3CCgM5uIIbOcPnmu3mRfDIwgZkCx32Dwj58DkXQCiAdztPcF4t9/0/3vIpZyirqiWtk17GJfxhQIgBuoEUigd/nmW8uwS7ISaFRrpJN49Hz9j9/CSHng48pRLg6CZZkBmUCsBWwFUNDnOfoT0jXDgq8HdZERQlyZqaikaDts0DKGzCqavS/vdg4GMpACKgwp0GB2SqIDGJsBgsqx0U37XU7X7ctIBe0UWXH/ovLuHtUQeDBqxM0CRg9/rNCPYxUwGL9uUoCRAhmIt0EpT0TI38adi7YrDsLMCpOqfaZSHgGyQzrK2yoyj9qX2d0iPA5dxUZjnt+ERHaYemZiv2swosAMJUKCVwwZQ9zAWMYRgUVbJtnkIoOHR3jjvcX/fhOPXsoptzKnnAcXsZ9emXMqcIvw+VTR5SSjUq9mTxiuOO+WXZzGNVTt3lGwoO12WcppJcXKaSIF5RRMs3IKo1kV2k3ZX9rfsA4BUb0S1ItusM+KB0Id1dJATS07GRK0IgP4wq+Z1oOZBYsCsFLIZGdoDZmg0WXiX79HPAXL8hSkaLAXamGQwMAY7/596t0O2QEIWVjJhLK1EjXHGSon+o0TROvpmOD4gK4nqDxglbeyikuAF68HAE94u1C1Ub5pO/ti2tp2UT3GlvJAZT58NQrBayIOGcitpk9dwN07Y3gIkK6C9lLJVs1MCaL7TsQfviRHl0AkoazCGsjTk91XUBbrVv7MLyHgdugL2t8wwEhqSKZnMclEZFLWsic5cZB770feySsC88ZZZXjfk+FJFb1fBrw85IVePdPJBGE4DYyFBLl/CMP3fejH8P9tFA9ExjC2gj56DG97PNYMg2RhJF7Mlhk5Rc1N9NgP9UsLtZb6znkUl8XVA95yI8VgiZEhXn8XsedpyPV7tt9qjASKNuNhXiE36sHsKwTVIT2cNedbOhZbM1wbTcotTc6r4FKEyWZ0cwzawmg/YDUiWMuItTqtZhkQEmMD1Ls95l7CAxkQeTLA2GdBagvpVnrjDr7/h0h0QggsuoM2v5K3Pg5DAxCxEKSAAYGBEf7IafT6Q/zG40i1Q1khQqvhRzFm1tggdDHbMrlp7yiJQxO5VTrhhmQkhIUqZKbnPX/tasPS7BgWyClq3QyzD+FYGtDk9gtxRCJ5wChmf+GzJ+8VTBAgYq2EkeDXF3JmEMIACMqkdBM+cwPnmqCGIaQnoOl5X60Qa6Lhf/Ofv8oiBQK0xbE2PHA2bbgnxzaFmXH0TKHk2udF8phBe19BN/4vWyaE8KGGjEYsmEhLvH64IRzIgQus6xDoQINVaE2NB+GstMVohUG55NRgW2IRfJnHtnk7NsY9u2LvuaX1Wq5TGWCvF2r0vakrCtQCevlWfuFmiBSgQYLMQezzW27ZBqMDEIaDL4BLtv6UJLP405E83IdkB5QJAmSCh1eLe76J/e/kMUBwcXuZgiEuMDbMrbNpr/Ow4BtIdoOtkv04x52rULKBQO3R7JLT3IVSwLFK7KZ84znfEChkk/SK+4qXh229EdzA8nkgkwFGCqk7BF/AkVG8R0vgBnGsEGuhlf/Qf/4ycwxgiDgyy7HTiZh5MIbWQEgo7bmz54ZKoaUNjx7HSx9HqsduwAd7291UB79+v3j+cjX7JAyvcRQiozi7CwBJDAzyVl+nf9/Nry5Eqsuzc/gEZD1QPlbYEPuuxKHNv7MFD77AfriBYdmKMrDyOLR5bUgAtRLop0tcVK0Lf1t2CrVw8weFW2woPAmGVGggYX/JRX8AlCas4buOYQUYcZBEpp82nss7/oSHhgDhgh3adSPcVA7TRKpNvHI1/+NKJLuhzIKbbCvEeId+9AdizfOQzbBM15fUTus5pT1eCGPYpDmXUEsPzDG3G/TE5NJwFLihBtvNz2reto6lvKUC0aMa9gesNLb8TgPK5WmVZ3ddqNpzJka7k2RjItr90suRnn/zP2mGBYrH8ODXeOVriLeAGdYYtfZgr+uRAbTyB5i1C0oxLBOxVlr1d77/FMQ73H4e3k4FDGHw2Cg/NI9iCpqgVSGWoDyYhWZogdwoxzfFHhfCGqpczD0OLCfqwBTKjC6/aYJbV6i8M+fLMqDa3ywyAOP2eXNbS7qdJp1p0AX28n5TykZFElfpAouwhplDqg0vnM+v/AnJbmgLADiLj13Fxkzkht22s+4j8uxrKSAudB/dczRblrtnSQlVtYVkBy95GC9cjHQbTCtkbBqKAYNH+nnjw2jbL2FslQ/7qBNKqomxuGECjN1aZlXI1A7IBmHUvRd15DEXixldwlJuv9O8LCn8wUH9UfNXAZaFRCf950489gMkusAWhIFsH+10Fq//GYyuAqQvL1TlE2A0FCiZ5keO0ytfRayl0M8j4BUsxDvwt/PE6idhtDqQqdJ+TnXfjglDI9jxp9S1CcwR3+ZT43+M/8OKc4j9URTthRtofGV0ng+cvsVcLD98fK8d8ca68K/vNC78rSyIFGWX4YGvMeIOwj62irY4gLc+HYP9Dhaa79Nc0L+AZVK6A8+fx6/ejuQ0aLNsJI0hJJsmP3wijBzYKB5JoRhfQxNUhnk92vUSYrPWPOtJyFj5DFKv1VyUtqZq6B5bZXTBV3uo/U01/MMoTqnTfvXt0YC2bHBYREETxQUePpYH30MsBRDMIercHDtfgdEMWPsu9N7cyiLRhXfvwJM/QLzTTcooSwetkGjjt5+kF36GVBss0z9y7fuXJTL9evpn8aFvIFtJITb0MKrSb1VzvL10VGmvJjieuaVZ8bhYjwEOpXKmNmyPCfZ7tfmUskIuVFF9lQustE7H0/N42YNI9ti7LxEx5lzFqh3mGpBnh0vv5pqsYTRR5t946Otu54VodNAW4p14+kKa8TFu2RGZ1X40y5OIZ+O6Q33Y9ix6+yFeuQiJtnKqtkFYQ5WMRTVMrYBsAsf9BU/5frQWDLulB8ARS5fqYDSjCfEmEPvkdMAeot4CUe0JkHvy/rwnJFrpjRv52Z8j0eUUYbNJc3/F6+2OkQHEW0vkZyEznYSJ+47hoRVIdjjGfsR3IcmWpsdOos88wIVr2d9xzq1TYhOylfa4ged/EpZdJj7uGCkh3tFQ8N1LdIVYE6b9j4+q7C15ZhKSV7+C4eW+EFjVA4nQ6ZkZ630YsbSvvzkFNgskfyy8qP8x57fRdYovpMR7T8LKQUhHVRlJWn9nVllXCJGnwy3ZNiURIOIYW87Ln0WspdAvtPJ75bNpJawR6t4WqfXYFkLMRPnEfbI3sLX3CAUYRgorn8VYH0Qsqmisa/rHi7HcfZGtkbKUYsgURLyWR1c7XmvE2Uo0QLP7BRe7KaNUvgdQftvLFjcq564oc9hf1RjUG501RAyxJk9mYpVEIAFzJChdFiULhsEasaZGcxWFF7sVGKuRyJHHFqnoH+iAV62CyJFPDe3kG2Q8BoaOKKT+rLQ/L8loA2dvCUdNMysqDN43Xl2X7KjGyDaqZtDoU+t8raJNP/k6eTDXykzhP1U1hdH3xQ6+XEV+BFVZa8XFtTrQEVAaqrU3E9dmZIvaWCkS2hSYvkwo1zqcy3SJjchGZbaoXFeOsNJkLrsbfJ0wMtUFPlfPWFz3I0rZgCO/f8XCkvK3qn7QgZt4jS/rcDRpOR6gMTf6tlQ9QEo1n+YtZ6C6MYzxmNrSr7nRU1jnXm3j9r7jBjeIBg+bsfbWX1UE5Inl4xoaAlJDKcATzH+iMbSa4GmaPAwzjgKm1uIZXovko9oYixrA3NSQYdf39s7RwJFQIzjJ63Jw2bK2wEeT/+1obZgbNfZu4Cj0EV4IhxhMRCAipRS7sDsRkRAhmACzjQsQhJD+6g8mQZ5buYtDyrDxal0AOwgQ0gBYWZZdty6lBKCUKmE7UTQfti+rlfLGe/LDY61LmioQ2XXxzq8lW80IkUdftVb+8iQCsRDSfq7SPpzPGV7htgU/RgoBIZSloBVAwjCE8NGKhPtqJdBUgezVueFhgAVVCZBW5j0NcyToB4VYOwliOxximtCjJeOz/40jnnKQ4sKt2FPSoGG0kWGwDaNrhjkS4icSYs12IFYIqbVGbgCgWLotJuVYNqdzg4CgRDvADvWJYJlQmRJqKgBItBPcPB+tYQ27v6cRj3twMoJlOruFAxApxPx4NxGyGcDtDBNv8ZfQ5MnIALvRRvfX3Bhg79CaQDyRLwwWQurMIJBDrDWdSiilsyODgIVYG0nJWgMEMwvOhthzCSQSNYHyVFs77qjwHRFxzpw2fdrN190ajyeYWWtt03A0M3bvvfdffe0NpsVGImll1uy518fPPO2UbDYrhMivJ6V0PB676+57L7n0UlB6/fWn3XjdbbFYTGtt30oIGhnNPPjgw9dcd2NmJCMSaW2ZyWT8hl//pqurU2nNbicZZpCgzOjoMV/71pr+IZmMq9FRGadDjjjy8wfsN2urrVLJxMDQ0AvPv3Dr7/9wx/yFEHGKJwjQ2eGdd931R98/SyklhFBaARBEq1evuWPBnTff8jumuIjF9Fi2d6Pp1199m92C68RTTnvl5UWUaNJKCyE4N7rFVh/8+cU/1VrH4vFzv//jvz32mEg0a6UBSEOqzJpDDzvsmGOO1Eq/9957Rx/7TUsDgsB2CNtq72i9/uobWlpbly5d+tWvn0AywWAhpRobOPDgg4798lFC0FXXXPeHP9wmE+1aazDrTN8u/7v70Ud96aM77NDR3pY1zcWLF//5zwuuv/GmXGbMaGq1MqsPOuTgrxxzdC6bIyJmp7mUUioej93w61tu/d1vZaKtSH7XpMccAdER7dNZ/gSR6ASaNpy5FYccf3300db2aUaqC6Ajjjo27LT/++PtACBbZ24+O+ycp596qnu9GSLWilh7U1vP0NBg2Jnr9W4K2QaR3myLrR5//PHAc+bPn981bX0YLbGmHkDud8BBYXf785//nEg2y2QnkN5i1naeMf8RIJnqRrxDproB3Pr72/K/fvHgwwEh09NcQnWRSD7//PP5E+bM/TghJlPTEO+gZCeopWfGTGVZ9q+nfPc0AEa6x2jqBnDO935gf3/m2ecAiDX3iEQHycTll18ROOYnn3xyq1nbyEQHgLPP/X7Yq5330wsAGE3dkfmhwsdopIEFUloNDQ2l0+mBgYE7FtzJzJ2d7XvMnZtMJv93t92+971zTpp3ImDkcjmllFJq+fLlb7zxhr3ulVZSiKeeetoOlGqtR0ZGksnk4ODQvffeq5hbmpp23nmntrb27T/ykYsvvvBLhx2GRCcDa9asSaXS2Wz2ueees5SytRURjY6O5nI5sNnV1XbP3Qs3mTnTfo3nnn2mr291b++MWbNmKa333Xff+fNv32OPT2itAMqZOaWU1vzuu+8+9PDDJMS0ro65u8+NxWKf+9znTjxx3vk/+TFEi1bazGWFNJRS++/3ue0/uuuzTz0VT7eZowPbbb/T5w/Y3zRNZpZSmrn8Xt+QUqix4Y/utPPs2bNt2UBERxx+yKMP3+fZCA7MvGZgoK2tTWv9g++ds3DhXa8sejXR3G4BY5kx+8LsWNbWgTo7ePU1V3/l2C8rpaSUr//79df+9XpTU3r77bdvaWnZcccdDz7k4HPP/h4gx8ayNtmXLl323nvvEhEz21e9+sqrEAbrBjrVDeJQW2L1brzl8PAQMy9atAgAIAHM3fOTmUzGZqOO7g0BHHr4kfZCufSynwOA0QKkgBSQANIi2QmkP7DprNHRkaJbbffhHYeGhpRSw8ND62+wKSjd3L7eO2+/zcz/+c9/YokWQAJxIAbEgLhMTQNw2c9/wcy5XO6tt97cfe4eECkgacSbDjzokIGBgWw2y8wnzDvZbgr4mc8eYI/tjjvusAkE4IAvHGRZllLqlVdeiSVbgfTmH9xWWWZ+xS9YsBCgeFMPQH+ZP9+2BCzLYub9Pn8wIG2BZDT1ALj8il8yc19f3+LFS7TWK5Yvb+uaDtlKiU5KdIJauqdvvGbNanvWmfnxx58QMh5v6gFw6uln2k/8zndPBwiU/PQ++zNzNps1TXPeiackUy2AAcQ23WzLBQsWnnjyd0GxWNN6AL57mnPt8d/8NgAYzQWyU1NFpVQdP4yDr08ADEMmW3oSLd2J1ukPP3j/yy+/LITo7Gifvn6PvUztUy1LAYCVA3JAFmBKpoqCfYZhJFu6Ey3dybbe5599atHLLwsh0qn0+uvZZb7u7taEeDIF0YR4E2LNiDVRskXlcp09G37p8IOZWQhxyOFHP/LwQzLZLFJNWqZu+/3vvnXCSfF4XGv9lWOOMhLNnl00kIgnEolUU0dPPNUzf+E9K1euFEJ0dnY2t7UBCuRkVi1Z8kYmk/nMpz+1+x4fz42s2nXOnvvus08mM7Zo0SIhvAV9RERWNtvc1rP/fvsy8zPPPHvRRRcTUXdPzz6f/iSpIelxb23L05YxO++803e+853cyEp7gxSfDmF9/HHHMnM8Hr/woksuveTCrI7LVLtItS7+95v77HPAJRddglhzkcfnkt10yU4UT0auG410GJEN9mj79rkOsGWpsaEVgARUqrlr/enrM7Ol1Fg25z35Q9tte/SXj4klUpalpBTLl6+YP/8uiiU8rX+hLGtsaCUgAJ1Kt8/o7dVaa62GhkYKXQwAELW0NAkhSQpbFeay1tjY4KytPtrR0Qng6WeefuyRh410j1ImA4JIJjpv/cOfzvvx93p7N9hii81nbrLJ66/8M8/0Y9lsNpvJZlcC2c0/uI2tmCzLzI7lAAFmrVkCixf/+6233pwzZ845Z52210P3nnv2aQAe+9tjr732+tZbb12YFWIppZUd2Hvvz/T2bgDgvgce/N1tf7z4kgvjsfjhhx18y803a13YXJ21BvDCC8+vWLHys5/d93vnnnX3vfe/8Nzf89gKEQHc0jltu223JaJMJvPLq66TshnCAVBEMs0MItL+VAtmnrPbLpY5ZsSSpmUZUi5e8saDDz5MsRRrXY8hVBHHql3R5puLt7a27v/5AwGKG+LoY46eMX0GEb300qI3ly4BpL3WlVJ77bXnXnvtmb/82ef+Of9Pf6F40oksEgFoa28/4qhjSBitTcn9D9ivt7eXiJ544sk3lryGWJpZ29hMZ+e0p574q83bSquYYXz9G/MW/OX/emdMt/nszWVvE2mGdluEMJFQmdFly97q7d0gHk/0zlj/9VccacrMG2204SGHHh5Ppqd1tB511JHxeFwI8eBDj4wOrIRozpeACCEuvezy3Xfffc6c3S6+5NLd58whost+fsXH9tqrKKBtGzBHH3G4rY/ue+CRgf7lTz75993nzNl9zpxNtpi15PXFMpn21qomk8lvnvDt3XbbtaOj89qrfrHDDh9R/rlvSqeamtIAVqxYvmLlKkUGuSdorZ3kar/YUUoddughhx16SP77+Xfc8eB9d8pEk6XrSQ4L3a+QGoLo2/K/t7f39v/7vfc3zfzd0860LO/uW2Sa5thYVghSypLSWLWqzw0GMOCgedOnT7/phmu9t1r25ltf/drxzBKC8hB1LGZssEGv97T29jYASmubV6Qhg3pjUzwetzkpm8vlf9Bab7fddr+95WbvDV9//fUzzjhbxJq0pfLFF62tbfPnz3/55UWzZm114rxvM/PixYsXLlhw4IEH+UgjhB4Z3nizD+6xx1wiuv+BB/759OMALrn08jm77ZZKpQ78wufOP+9HQjYrzyDTTem3lr1x0imn33DdVR/5yPbHfvXr/X19Pqq66KthGKIknJBfJEXzZBtkRLAsJaXs6+tvODxvNDTMxvnX4DzKzpzJjL7yyqtnnn3OQw/cH2/uzg0vtznLMOQNN/7m7LPOiqfbLcsiItOyKJFi9iUXWJa1enV/a2srkRBC/PH2Px339eNWrxkTyTSbJsGwzx8cHPjJ+RdmcyYRaWYh6OmnnwOMJUuW2hJrm222JpkkzVIKrbWUBueybd2dm222KYCRkeFly97Oj5+IstnswMBgV1eHZSnDMK74xS/PPefsgWEl40mYo/mZMAyplXn+BRfffOO1o5lMOpW66JKfg1XckF5rSQph8ujBX9w/lUoppZqami742QUgamtrsywrFosddujBF1xwiTK9/XdgmZZMdtx4/bX7f26fz3523/PP+9Ff/vIX24+zyTM4ONzX39/R0Tl9+oytPrjFs089FW/uNM0cQEJKlclASmEY3o3TDcP40Y9/cu01V8fTbaZlEYlMJkPxGhCsqm2s+piLGcCyN9/c7/MHEQQRrV69ZunSpVA5kerQ/lqUNWvWvPPO28BqwHJah4kYYjE78dwOyLz55ps7fHSX7T+yw913/oWIPrTdtiQMGTeK9rAbGR45/yfnuz3T7AXbTLHml158YcmSJTNnztx8s81P+NZxl116MZCGkFZ2DMiccer329vbmfmZZ5979503gbjtcgshHn/88S984QsHfPHga678BTN/6EPbDY/mjFiK8xmbZCt0C5S87fe3nXbKvK1nz162bOnNv7kVIMudJ1uKmJaS8abDDj0IgJRyl5133mXnnQuCR6nZW2+9y667/PXhRxFL+SW9JqPp68efsOuuu3R1dR166KE2Y9nd3MaG+x/7698232xzAOf98Ny99947N9wHkYLWCiPTN9p8cGBwZKBPNnV67/neilUu2U2n04kwYDRSaDVukyanrZQTGxnLjD7/zLP/fOa5555+duniZZBJmWrXLq3zHNHa2trd3T19oxk9vb09M3p7Zszont4djxne3qGmafYPZu67Z8EvfvkrItpyyy1vuP4alR2QJODpTiqEaJ+2npHoijX1GOluI91N8biMGbmx4QsuulQIkc1mL7rwZ+f/9GfbbPfBnvW7Prz97F9dedXJJ83L5XJEdMFFl7HyWRhjY9n+/v5rr7pywcI7iWj3OXN+9tPzrbF+KWO+jvUMgHKKPrXv53fadfc9P77PSCbrV0AESJUZ3nHHnWbPns3MQ0NDL7708ksvvfTSSy+98OILy5Yts7nv8EMPAnJFPTxYaZFIvfvOshPmnQzANvXyP5KRvvjSK5SylFKf/OQnFt5119y5c3rWn7bRzA0OP+ywp594+MF758/eZmu2d/V1R9TZ0dbd3TP9A709vRt0z+jtnjF92npdQlBDc0MaimPN+MAWq1evNk1z0aJFMtUukl0y1SWSBYDESHcDdPBhR5imOTY2NjIysmpVX19/f19fX19f38pVq/r7+3fadXeAZm4xe3Bw0DTNl19+WabaZby9pa1zyZIlNjh01Je/CgCJrnRrz7Jly0zTfPutt5rb14Nso4QPj5HJLojYzTffksecTNPsW7XShojs4+eXXwGIWNN6gPzUZ/YzTdM0zQULFxLFRKx1o423GBwYyOVypmnOmfsxAKCWTbfcZnR0xDTNJ554AkiKVDfQDMSBJqOpB6Abb7rZvs/nDjgISAC44he/NE1TKfXd084AKJ7uksl2iPSMjTZbs2a1aZrvvPN2c9t6oHT3jI1XLF9umuYLLzwPo8WlG26//c/MPDQ0bJrmyaecCiDROh2gr339OC+M3te3amiwEI246+57hEwA8junnmGaZiYzNjQ01Ndnk71/1apVfX19b7/99vQNNwOaRaKzyrhLZ+A5jSuxJwAspWhvbzcMo6Ozw47xaaV1MZ7LyUTCMIxEIpFOp7u6Ojs7Ojo7Ozs7O6d1dXV0dKRSSYCllC0tLYZhdHZ2aqXZiA0NDBz/jRNssOeG667acefdkBuWUk6b1mUYRte0TiKU7sKimYXRdMRRx/z4x+cNDw/ZRkZn1zR73ff3933nu6ee8K2TRKKdWQGcSMQNwzAMo72tjdkyUk1vLn3t9DPPicVihmEsmH/7zE03B2djMSOVShuG0dnRAYBZi2RcplpEMmljLu3tbfZ90qkkkJ2x4WZf/coxhmEIIf78lwVAwtRQmkQ8/Z83F//jqacNw5gxo/dLhx8EHo0ZMfulOjs6HGeCtYi1HPeNE/pWrWpubjIMI51OAdDKkqmuq6688pBDD31jyRJHIHV2Nbe02O//hz/84cijjhGxJkA1pdOGYSSTiebm5s5Om+wdXV1dnZ2dvb29sVgsqJl+RfubK3qFdZpWgDTWrBn89ryTY7FY/+rVzKJ0RFpryPSTf3/mO9893bKUELbudJr82zGQ115fAplaubJv3kmnGIaxZs0AILVliWT73Xfdf/iRX56x/vokRHdPD0jkctZJJ5/a1Nw8OjqazVkQxX2gmZkhSKbPOuvM62+65ZOf+NjsrWd1d3e9996K559/4a677/3P229QolMzs9KQqRdfWvSdU08H442lSyFTVi5L8Y5fXnW90jqdTsfj8ekzNnxj6ZsrV60++ZRTSdDy5StgxGzZUGhEIdPXXn/T3/72BIDnnn8RMplIJM4663tK677+/tf+/QbF0/aOrkRMRvKcc390330PMutly96CTA0MDX9r3smpZHLVqj67kkwrLYzE8nff++z+B+66y04MPPLoY5BJpbTWWqa6bv3d7xfcef+n9/7EzjvvuMEGvSPDI6/+67UHH3rkH08+AUrKZBIydfc994+MjJimSQWt5yR1MPOaNQOQRqOKDhudNqM1rEHHDI+3hSVCIJsFRsINvxYYMWgFa8AxBN1bEQnOrnFLyuJINENrmANOXk2srUyTMSkNlRkteW6zTCULDpFvbAbirYVMzly/e0kKiTQsE2rQiTUl2koSTgi5ITcxpgmJJHI58JBL83bfiieJ7AgwVngpFfDuTuH4WP7MFBKp/HOllMo0YQ35q8ESItnCrFlrCIHsqHttoCPX5rTcnYyMRTAMw+6FHOC+FnZfIilDSzpt64cAaRgAGKyswq2kIW3xlk+nMQwjD0xUcFWEsDUge9BCZu2riRYkhbTFp1IqnypmSCMvdLXWRJDSKJwWwMfShpGUVqzZ+8ql48wPTDPbLo79UqU3F1IK8r2+d8EKIYnyjQOItfICqvmnBB6WUiX7G04expo6JulBE1wOIMbrLRq8g8bUUScFJ7rIZHwYq1Edr3iKM9Y1CvK4MtYErMCpY3JODK2jjMVTTLZuiEbRyDtPturiqWPtHQ1F3qdEyJTlVjVj8XiNYOqYjPxRsW1WwxirYQX1U2Jt0npCjazKF5NpmUwdk17DTWLGmjqmjPfJJ6ynjnVF6on6JpWqv5ZqGeZ/KUPTurfaawVIKdrEl2kaFtJfmRpF4npgj6DIGq1FpqmvDV9wBhHVRDdvU9ZIo5KQqbrfn9b2umnoAHid1sCTpcuraMSiWSsKa9w6VdI67dGW5Bs2ftDUEMaaOmpa/Dw5+awhb85RHivW+Veecmcn4WzRWmSsKSThfc1aYsKe9L7SDFNmQCUKiyqu48q++SSQYzS+t1/H+JgmepAlOBbXPkiaVFPBjb90PLMAJoq1aYIHKSbjGppsy5vWybfxY548wZwsJpx/uEaxMeU3rhOauGE579zol/pv8Rb5ffSU8VCF70s+oPG+4/t/9Yj3x7xN+nXO4/kAmoSkE++PefvvPng8Fz/Vdp0YtwFNQn32Xwv2U03M6k2SoWpvKxr9AjxpuI0nZGW/z0RaWLCZq72tmJAX4MZTYOoYL0HVMOOd1m1STB0Ts0y5upPFlJSYOhq/5v1pM7QW10OVb7OuBlneR0qzsiqslVNoAt6h5rBwowPmPIGLfTIrTaqFsSZ+HdC4UbPRkSYaj+WxTpic3jmqYocBMeHrINCJ5XHm4IZTmSeEaJPB/PXOURXjEY2m+Lrv/kyKB63zVpdoKMWnDOcpqGJcVCFP+qVGk3aJv888RPH+oQJHYW5eS0uc1h3m43qZj98PjDV+TRZoHMbJE/W4tcJ8vsbJU5XQk0St8/uMYut6fyx63000jcPd1oI4FJObnyoaLuPmjdJaYugGczSvrVUiJuWC5ipPm3jCTWwi0DqoJ0WNQ1/XS4onrEZmXdysihvIWJPcKZkkmmeSL7/JRG1RFzV5naVHbeFvWktiYFLFDKOdKeqi5uQS0fy+FQOTKsuBI525TuFYk0qz8DphU9PauuX7DyCliXsOTX46rLsl9pPumErhnxR0mArpTB1TjDUlUKYYa8r+n5JYU4JibQgSmmKs/2aJtq6jmlOMVWFK1hZoRHWwzn+z1uXJyViBDYhobTH1FOvUMoMCE03I/9pw9zjozUmsbf8fE56A6Cwp5oIAAAAASUVORK5CYII=";
const SUPABASE_URL = "https://gajniuyvzntimumhdawj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdham5pdXl2em50aW11bWhkYXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMDUzNzgsImV4cCI6MjA5NTU4MTM3OH0.SjfV5SB5OrmcvJt9OP6Ui5S3UQawr-FXRMRd6wQfpxw";

// ── Supabase helpers ──
async function sbFetch(path, options={}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok && res.status !== 204) {
    const err = await res.text();
    throw new Error(err);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function loadPrograms() {
  const rows = await sbFetch("programs?order=updated_at.desc&limit=1");
  if (rows && rows.length > 0) return rows[0].data;
  return null;
}

async function savePrograms(data) {
  try {
    // Try PATCH first (update existing)
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/programs?id=eq.00000000-0000-0000-0000-000000000001`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({ data, updated_at: new Date().toISOString() }),
    });
    const patchData = patchRes.ok ? await patchRes.json() : [];
    // If nothing was updated, insert new row
    if (!patchData || patchData.length === 0) {
      await fetch(`${SUPABASE_URL}/rest/v1/programs`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify({ id: "00000000-0000-0000-0000-000000000001", data, updated_at: new Date().toISOString() }),
      });
    }
  } catch(e) {
    console.error("Save programs error:", e);
    throw e;
  }
}

async function loadLog() {
  const rows = await sbFetch("workout_log?order=created_at.desc&limit=500");
  return rows || [];
}

async function insertLog(entry) {
  const rows = await sbFetch("workout_log", {
    method: "POST",
    body: JSON.stringify({ exercise: entry.exercise, sets: entry.sets, reps: entry.reps, weight: entry.weight, date: entry.date }),
  });
  return rows ? rows[0] : null;
}

async function deleteLogEntry(id) {
  await sbFetch(`workout_log?id=eq.${id}`, { method: "DELETE" });
}

async function loadBodyWeight() {
  const rows = await sbFetch("body_weight?order=date.desc&limit=365");
  return rows || [];
}
async function insertBodyWeight(entry) {
  const rows = await sbFetch("body_weight", {
    method: "POST",
    body: JSON.stringify({ weight: entry.weight, date: entry.date }),
  });
  return rows ? rows[0] : null;
}
async function deleteBodyWeight(id) {
  await sbFetch(`body_weight?id=eq.${id}`, { method: "DELETE" });
}

const DEFAULT_PROGRAMS = [
  { id: 1, name: "Styrkeprogram A", days: [
      { id: 101, day: "Dag 1", focus: "Bröst & Triceps", exercises: [{name:"Bänkpress",rest:60},{name:"Triceps pushdown",rest:60},{name:"Chest fly",rest:60},{name:"Dips",rest:60}] },
      { id: 102, day: "Dag 2", focus: "Rygg & Biceps", exercises: [{name:"Marklyft",rest:90},{name:"Skivstångsrodd",rest:60},{name:"Bicepscurl",rest:60},{name:"Latsdrag",rest:60}] },
      { id: 103, day: "Dag 3", focus: "Ben & Axlar", exercises: [{name:"Knäböj",rest:120},{name:"Leg press",rest:90},{name:"Axelpress",rest:60},{name:"Lateralhöjning",rest:60}] },
  ]},
  { id: 2, name: "Helkroppsprogram", days: [
      { id: 201, day: "Dag 1", focus: "Helkropp A", exercises: [{name:"Knäböj",rest:120},{name:"Bänkpress",rest:90},{name:"Skivstångsrodd",rest:60},{name:"Axelpress",rest:60}] },
      { id: 202, day: "Dag 2", focus: "Helkropp B", exercises: [{name:"Marklyft",rest:90},{name:"Incline press",rest:60},{name:"Latsdrag",rest:60},{name:"Bicepscurl",rest:60}] },
      { id: 203, day: "Dag 3", focus: "Helkropp C", exercises: [{name:"Front squat",rest:120},{name:"Dips",rest:60},{name:"Pullups",rest:60},{name:"Face pulls",rest:60}] },
  ]},
];

const DAYS_OF_WEEK = ["Dag 1","Dag 2","Dag 3","Dag 4","Dag 5","Dag 6","Dag 7"];
const BLUE = "#00aaff", BLUE_DARK = "#0077cc", BLUE_DIM = "#00aaff22";

function formatTime(s) {
  return `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
}
function uid() { return Date.now() + Math.random(); }

const iStyle = { background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:8, padding:"8px 10px", color:"#d0e4f0", fontSize:14, outline:"none", boxSizing:"border-box", width:"100%", textAlign:"center", fontWeight:700 };
const inputStyle = { width:"100%", background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:10, padding:"11px 14px", color:"#d0e4f0", fontSize:14, marginBottom:10, boxSizing:"border-box", outline:"none" };
const timerCard = { background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:22, padding:"32px 24px", display:"flex", flexDirection:"column", alignItems:"center" };
const bigTime = { fontSize:72, fontWeight:900, letterSpacing:-2, color:"#fff", fontVariantNumeric:"tabular-nums" };
const timerBtn = (bg) => ({ flex:1, padding:"14px 0", borderRadius:14, background:bg, color:"#fff", border:"none", fontWeight:800, fontSize:15, cursor:"pointer" });
const card = { background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:16, overflow:"hidden", marginBottom:14 };
const cardHeader = { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"linear-gradient(90deg,#101820,#0d1117)", borderBottom:"1px solid #1a2a3a" };
const smallBtn = (bg="#1a2a3a", color="#00aaff") => ({ background:bg, border:"none", color, borderRadius:8, padding:"5px 11px", fontSize:12, fontWeight:700, cursor:"pointer" });
const ghostInput = { background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:8, padding:"7px 10px", color:"#d0e4f0", fontSize:13, outline:"none", width:"100%", boxSizing:"border-box" };

// ── Save status indicator ──
function SaveBadge({ status }) {
  if (status === "idle") return null;
  const map = { saving: ["#3a6888","⏳ Sparar…"], saved: ["#207050","✓ Sparat"], error: ["#882020","⚠ Fel vid sparning"] };
  const [color, text] = map[status] || map.idle;
  return <div style={{ fontSize:11, color, fontWeight:700, letterSpacing:1 }}>{text}</div>;
}

const RestTimer = ({ restDuration, setRestDuration, timerRef: externalRef }) => {
  const [restSeconds, setRestSeconds] = useState(restDuration);
  const [restRunning, setRestRunning] = useState(false);
  const [restDone, setRestDone] = useState(false);
  const restRef = useRef(null);
  useEffect(() => { if (!restRunning) setRestSeconds(restDuration); }, [restDuration]);
  useEffect(() => {
    if (restRunning) {
      restRef.current = setInterval(() => {
        setRestSeconds(s => { if (s<=1) { clearInterval(restRef.current); setRestRunning(false); setRestDone(true); return 0; } return s-1; });
      }, 1000);
    } else clearInterval(restRef.current);
    return () => clearInterval(restRef.current);
  }, [restRunning]);
  function start() { setRestSeconds(restDuration); setRestDone(false); setRestRunning(true); }
  function stop() { setRestRunning(false); setRestSeconds(restDuration); setRestDone(false); }
  useEffect(() => { if (externalRef) externalRef.current = { start }; });
  const r=34, circ=2*Math.PI*r, dash=circ*(restDuration>0?restSeconds/restDuration:1);
  return (
    <div style={{ background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:16, padding:"14px 16px", marginTop:16 }}>
      <div style={{ fontSize:11, color:"#3a7aaa", letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>😴 Vilatimer</div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <span style={{ fontSize:12, color:"#445566" }}>Vilotid</span>
        {[30,60,90,120].map(sec => (
          <button key={sec} onClick={() => { setRestDuration(sec); if (!restRunning) setRestSeconds(sec); }} style={{ padding:"4px 9px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, background:restDuration===sec?BLUE:"#111820", color:restDuration===sec?"#fff":"#4488aa" }}>{sec}s</button>
        ))}
        <input type="number" value={restDuration} min={5} max={600} onChange={e=>{ const v=Number(e.target.value); setRestDuration(v); if (!restRunning) setRestSeconds(v); }} style={{ ...ghostInput, width:52, marginBottom:0, textAlign:"center", fontWeight:700, padding:"4px 6px" }} />
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ position:"relative", width:76, height:76, flexShrink:0 }}>
          <svg width="76" height="76" style={{ transform:"rotate(-90deg)" }}>
            <circle cx="38" cy="38" r={r} fill="none" stroke="#1a2a3a" strokeWidth="5"/>
            <circle cx="38" cy="38" r={r} fill="none" stroke={restDone?"#50e090":restSeconds<=10&&restRunning?"#ff4466":BLUE} strokeWidth="5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition:"stroke-dasharray 0.9s linear,stroke 0.3s" }}/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:restDone?18:15, fontWeight:900, color:restDone?"#50e090":"#fff" }}>
            {restDone?"✓":formatTime(restSeconds)}
          </div>
        </div>
        <div style={{ flex:1 }}>
          {restDone && <div style={{ color:"#50e090", fontWeight:700, fontSize:13, marginBottom:6 }}>Vila klar! 💪</div>}
          {!restDone && !restRunning && <div style={{ color:"#334455", fontSize:12, marginBottom:6 }}>Starta efter ett set</div>}
          {restRunning && <div style={{ color:BLUE, fontSize:12, marginBottom:6 }}>{restSeconds<=10?"⚡ Snart dags!":"Vila pågår…"}</div>}
          <button onClick={restRunning?stop:start} style={{ width:"100%", padding:"9px", borderRadius:10, border:"none", cursor:"pointer", background:restRunning?"#1a0a1a":`linear-gradient(135deg,${BLUE},${BLUE_DARK})`, color:restRunning?"#ff4466":"#fff", fontWeight:800, fontSize:13 }}>
            {restRunning?"⏹ Avbryt":restDone?"↺ Igen":"▶ Starta vila"}
          </button>
        </div>
      </div>
    </div>
  );
};

function ExerciseCard({ exName, exIdx, exRest, log, onLogSet, onStartRest }) {
  const prevSets = (() => {
    const entries = log.filter(e => e.exercise.toLowerCase()===exName.toLowerCase());
    if (!entries.length) return [];
    entries.sort((a,b) => new Date(b.date)-new Date(a.date));
    const latestDate = entries[0].date;
    return entries.filter(e => e.date===latestDate);
  })();
  const makeSet = (i) => ({ id:uid(), reps:prevSets[i]?.reps||"10", weight:prevSets[i]?.weight||"", done:false });
  const [sets, setSets] = useState([makeSet(0),makeSet(1),makeSet(2)]);

  function updateSet(id,field,val) { setSets(prev=>prev.map(s=>s.id===id?{...s,[field]:val}:s)); }
  function toggleDone(id) {
    const set=sets.find(s=>s.id===id);
    if (!set.weight) return;
    const newDone=!set.done;
    setSets(prev=>prev.map(s=>s.id===id?{...s,done:newDone}:s));
    if (newDone) {
      onLogSet({ exercise:exName, sets:"1", reps:set.reps, weight:set.weight, date:new Date().toISOString().slice(0,10) });
      // find next undone set
      const currentIdx = sets.findIndex(s => s.id === id);
      const nextUndone = sets.slice(currentIdx + 1).find(s => !s.done);
      onStartRest({ exercise:exName, reps: nextUndone?.reps || set.reps, weight: nextUndone?.weight || set.weight, rest: exRest });
    }
  }
  function addSet() { const last=sets[sets.length-1]; setSets(prev=>[...prev,{id:uid(),reps:last?.reps||"10",weight:last?.weight||"",done:false}]); }
  function removeSet(id) { if (sets.length<=1) return; setSets(prev=>prev.filter(s=>s.id!==id)); }

  const doneCount=sets.filter(s=>s.done).length;
  return (
    <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:16, marginBottom:14, overflow:"hidden" }}>
      <div style={{ padding:"12px 16px", background:"linear-gradient(90deg,#101820,#0d1117)", borderBottom:"1px solid #1a2a3a", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:BLUE_DIM, color:BLUE, fontWeight:900, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{exIdx+1}</div>
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:"#c0d8f0" }}>{exName}</div>
            {prevSets.length>0 && <div style={{ fontSize:11, color:"#3a6888", marginTop:1 }}>Förra: <span style={{ color:"#70aad0" }}>{prevSets.map(s=>`${s.weight}kg×${s.reps}`).join(", ")}</span></div>}
            {prevSets.length===0 && <div style={{ fontSize:11, color:"#2a4455" }}>Ingen tidigare data</div>}
          </div>
        </div>
        <div style={{ background:doneCount===sets.length&&sets.length>0?"#0a2010":BLUE_DIM, color:doneCount===sets.length&&sets.length>0?"#50e090":BLUE, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700 }}>
          {doneCount}/{sets.length} set
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"32px 1fr 1fr 1fr 36px", gap:6, padding:"8px 14px 4px", alignItems:"center" }}>
        <div/><div style={{ fontSize:10, color:"#334455", letterSpacing:1, textAlign:"center" }}>SET</div>
        <div style={{ fontSize:10, color:"#334455", letterSpacing:1, textAlign:"center" }}>REPS</div>
        <div style={{ fontSize:10, color:"#334455", letterSpacing:1, textAlign:"center" }}>KG</div><div/>
      </div>
      <div style={{ padding:"0 14px 12px" }}>
        {sets.map((s,i) => (
          <div key={s.id} style={{ display:"grid", gridTemplateColumns:"32px 1fr 1fr 1fr 36px", gap:6, alignItems:"center", marginBottom:6 }}>
            <button onClick={()=>toggleDone(s.id)} style={{ width:28, height:28, borderRadius:7, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, background:s.done?"#0a2010":"#111820", color:s.done?"#50e090":"#334455", flexShrink:0 }}>
              {s.done?"✓":i+1}
            </button>
            <div style={{ ...iStyle, background:s.done?"#0a1810":"#0a0e14", border:`1px solid ${s.done?"#1a3a20":"#1a2a3a"}`, color:"#556677", fontSize:13 }}>{i+1}</div>
            <input type="number" value={s.reps} onChange={e=>updateSet(s.id,"reps",e.target.value)} disabled={s.done} style={{ ...iStyle, background:s.done?"#0a1810":"#0a0e14", border:`1px solid ${s.done?"#1a3a20":"#1a2a3a"}`, color:s.done?"#50e090":"#d0e4f0" }}/>
            <input type="number" value={s.weight} onChange={e=>updateSet(s.id,"weight",e.target.value)} disabled={s.done} placeholder={prevSets[i]?.weight||""} style={{ ...iStyle, background:s.done?"#0a1810":"#0a0e14", border:`1px solid ${s.done?"#1a3a20":s.weight?"#0077cc":"#1a2a3a"}`, color:s.done?"#50e090":BLUE }}/>
            <button onClick={()=>removeSet(s.id)} style={{ width:28, height:28, borderRadius:7, border:"none", cursor:"pointer", background:"none", color:s.done?"#223344":"#3a2a2a", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
        ))}
        <button onClick={addSet} style={{ width:"100%", padding:"8px", borderRadius:10, border:`1px dashed ${BLUE_DARK}`, background:"transparent", color:BLUE, fontWeight:700, fontSize:13, cursor:"pointer", marginTop:4 }}>+ Lägg till set</button>
      </div>
    </div>
  );
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const times = [0, 0.25, 0.5];
    times.forEach(t => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.6, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.18);
    });
  } catch(e) {}
}

function RestPopup({ restDuration, setRestDuration, onClose, nextSet }) {
  const [restSeconds, setRestSeconds] = useState(restDuration);
  const [restRunning, setRestRunning] = useState(true);
  const restRef = useRef(null);

  useEffect(() => {
    setRestSeconds(restDuration);
    setRestRunning(true);
  }, []);

  useEffect(() => {
    if (restRunning) {
      restRef.current = setInterval(() => {
        setRestSeconds(s => {
          if (s <= 1) { clearInterval(restRef.current); setRestRunning(false); playBeep(); return 0; }
          return s - 1;
        });
      }, 1000);
    } else clearInterval(restRef.current);
    return () => clearInterval(restRef.current);
  }, [restRunning]);

  const done = restSeconds === 0 && !restRunning;
  const r = 54, circ = 2 * Math.PI * r;
  const dash = circ * (restDuration > 0 ? restSeconds / restDuration : 0);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
      <div style={{ background:"#0d1117", border:`1px solid ${BLUE_DARK}`, borderRadius:28, padding:"36px 32px", display:"flex", flexDirection:"column", alignItems:"center", gap:16, minWidth:280 }}>
        <div style={{ fontSize:11, color:BLUE, letterSpacing:4, textTransform:"uppercase" }}>😴 Vilar</div>

        {/* Circle timer */}
        <div style={{ position:"relative", width:130, height:130 }}>
          <svg width="130" height="130" style={{ transform:"rotate(-90deg)" }}>
            <circle cx="65" cy="65" r={r} fill="none" stroke="#1a2a3a" strokeWidth="7"/>
            <circle cx="65" cy="65" r={r} fill="none"
              stroke={done ? "#50e090" : restSeconds <= 10 ? "#ff4466" : BLUE}
              strokeWidth="7" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
              style={{ transition:"stroke-dasharray 0.9s linear, stroke 0.3s" }}/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:done?36:38, fontWeight:900, color:done?"#50e090":"#fff", fontVariantNumeric:"tabular-nums" }}>
            {done ? "✓" : formatTime(restSeconds)}
          </div>
        </div>

        {done && <div style={{ color:"#50e090", fontWeight:800, fontSize:16 }}>Vila klar! Kör nästa set 💪</div>}
        {!done && restSeconds <= 10 && <div style={{ color:"#ff4466", fontWeight:700, fontSize:14 }}>⚡ Snart dags!</div>}

        {/* Next set info */}
        {nextSet && (
          <div style={{ background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 20px", width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:10, color:"#3a6888", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Nästa set</div>
            <div style={{ fontSize:13, color:"#7098b0", marginBottom:4 }}>{nextSet.exercise}</div>
            <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
              <div>
                <div style={{ fontSize:11, color:"#334455", marginBottom:2 }}>REPS</div>
                <div style={{ fontSize:26, fontWeight:900, color:"#fff" }}>{nextSet.reps}</div>
              </div>
              <div style={{ width:1, background:"#1a2a3a" }}/>
              <div>
                <div style={{ fontSize:11, color:"#334455", marginBottom:2 }}>VIKT</div>
                <div style={{ fontSize:26, fontWeight:900, color:BLUE }}>{nextSet.weight ? `${nextSet.weight} kg` : "—"}</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick duration buttons */}
        <div style={{ display:"flex", gap:8 }}>
          {[30,60,90,120].map(sec => (
            <button key={sec} onClick={() => { setRestDuration(sec); setRestSeconds(sec); setRestRunning(true); }}
              style={{ padding:"6px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, background:restDuration===sec?BLUE:"#1a2a3a", color:restDuration===sec?"#fff":"#4488aa" }}>{sec}s</button>
          ))}
        </div>

        <button onClick={onClose} style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", cursor:"pointer", background: done ? "linear-gradient(135deg,#207050,#105030)" : "#1a2a3a", color: done ? "#fff" : "#4488aa", fontWeight:800, fontSize:15 }}>
          {done ? "✓ Kör nästa set!" : "Hoppa över vila"}
        </button>
      </div>
    </div>
  );
}

function ActiveWorkout({ day, log, onLogSet, onFinish, passSeconds, restDuration, setRestDuration }) {
  const [showRestPopup, setShowRestPopup] = useState(false);
  const [nextSet, setNextSet] = useState(null);
  const [exercises, setExercises] = useState(day.exercises.map(e => ({ ...e, uid: uid() })));
  const [newExName, setNewExName] = useState("");
  const [showAddEx, setShowAddEx] = useState(false);

  function handleStartRest(next) { setNextSet(next); if(next?.rest) setRestDuration(next.rest); setShowRestPopup(true); }

  function addExercise() {
    if (!newExName.trim()) return;
    setExercises(prev => [...prev, { name: newExName.trim(), rest: restDuration, uid: uid() }]);
    setNewExName(""); setShowAddEx(false);
  }

  function moveUp(idx) {
    if (idx === 0) return;
    setExercises(prev => { const a = [...prev]; [a[idx-1], a[idx]] = [a[idx], a[idx-1]]; return a; });
  }

  function moveDown(idx) {
    setExercises(prev => { if (idx >= prev.length-1) return prev; const a = [...prev]; [a[idx], a[idx+1]] = [a[idx+1], a[idx]]; return a; });
  }

  function removeExercise(idx) {
    setExercises(prev => prev.filter((_,i) => i !== idx));
  }

  return (
    <div>
      {showRestPopup && (
        <RestPopup restDuration={restDuration} setRestDuration={setRestDuration} onClose={() => setShowRestPopup(false)} nextSet={nextSet} />
      )}

      {/* Pass banner */}
      <div style={{ background:`linear-gradient(135deg,#0a1828,#0a0e14)`, border:`1px solid ${BLUE_DARK}`, borderRadius:16, padding:"14px 18px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:10, color:BLUE, letterSpacing:3, textTransform:"uppercase", marginBottom:2 }}>⚡ {day.focus}</div>
          <div style={{ fontSize:28, fontWeight:900, color:"#fff", fontVariantNumeric:"tabular-nums" }}>{formatTime(passSeconds)}</div>
        </div>
        <button onClick={onFinish} style={{ background:"#1a0a14", border:"none", color:"#ff4466", borderRadius:10, padding:"10px 16px", cursor:"pointer", fontWeight:800, fontSize:13 }}>⏹ Avsluta</button>
      </div>

      {exercises.map((ex, idx) => (
        <div key={ex.uid}>
          {/* Move/remove controls */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, paddingLeft:4 }}>
            <span style={{ fontSize:12, color:"#3a6888", flex:1, fontWeight:700 }}>{ex.name||ex}</span>
            <button onClick={() => moveUp(idx)} style={{ background:"#111820", border:"none", color:"#4488aa", borderRadius:6, padding:"3px 8px", cursor:"pointer", fontSize:13 }}>↑</button>
            <button onClick={() => moveDown(idx)} style={{ background:"#111820", border:"none", color:"#4488aa", borderRadius:6, padding:"3px 8px", cursor:"pointer", fontSize:13 }}>↓</button>
            <button onClick={() => removeExercise(idx)} style={{ background:"#1a0a14", border:"none", color:"#ff4466", borderRadius:6, padding:"3px 8px", cursor:"pointer", fontSize:13 }}>✕</button>
          </div>
          <ExerciseCard exName={ex.name||ex} exIdx={idx} exRest={ex.rest||60} log={log} onLogSet={onLogSet} onStartRest={handleStartRest}/>
        </div>
      ))}

      {/* Add exercise */}
      {showAddEx ? (
        <div style={{ display:"flex", gap:8, marginTop:8, marginBottom:8 }}>
          <input placeholder="Ny övning…" value={newExName} onChange={e=>setNewExName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addExercise()} style={{ flex:1, background:"#0a0e14", border:`1px solid ${BLUE_DARK}`, borderRadius:10, padding:"10px 14px", color:"#d0e4f0", fontSize:14, outline:"none" }}/>
          <button onClick={addExercise} style={{ background:`linear-gradient(135deg,${BLUE},${BLUE_DARK})`, border:"none", color:"#fff", borderRadius:10, padding:"10px 14px", cursor:"pointer", fontWeight:800, fontSize:14 }}>+ Lägg till</button>
        </div>
      ) : (
        <button onClick={() => setShowAddEx(true)} style={{ width:"100%", padding:"11px", borderRadius:12, border:`1px dashed ${BLUE_DARK}`, background:"transparent", color:BLUE, fontWeight:700, fontSize:13, cursor:"pointer", marginTop:8, marginBottom:8 }}>+ Lägg till övning</button>
      )}

      {/* Rest duration */}
      <div style={{ background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 16px", marginTop:8 }}>
        <div style={{ fontSize:11, color:"#3a7aaa", letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>😴 Vilotid</div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {[30,60,90,120].map(sec => (
            <button key={sec} onClick={() => setRestDuration(sec)} style={{ flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:restDuration===sec?BLUE:"#111820", color:restDuration===sec?"#fff":"#4488aa" }}>{sec}s</button>
          ))}
          <input type="number" value={restDuration} min={5} max={600} onChange={e=>setRestDuration(Number(e.target.value))} style={{ width:56, background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:8, padding:"7px 6px", color:"#d0e4f0", fontSize:13, outline:"none", textAlign:"center", fontWeight:700 }}/>
        </div>
      </div>
    </div>
  );
}

// ── Stats Tab ──
function StatsTab({ log, bodyWeight, setBodyWeight, insertBodyWeight, deleteBodyWeight }) {
  const [statsView, setStatsView] = useState("overview"); // overview | exercise | bodyweight | calendar
  const [selectedExercise, setSelectedExercise] = useState("");
  const [bwForm, setBwForm] = useState({ date: new Date().toISOString().slice(0,10), weight: "" });

  // Get unique exercises from log
  const exercises = [...new Set(log.map(e => e.exercise))].sort();

  // PR per exercise
  const getPR = (exName) => {
    const entries = log.filter(e => e.exercise === exName && e.weight);
    if (!entries.length) return null;
    return entries.reduce((best, e) => Number(e.weight) > Number(best.weight) ? e : best);
  };

  // Progress data for selected exercise
  const getProgressData = (exName) => {
    const entries = log.filter(e => e.exercise === exName && e.weight);
    const byDate = {};
    entries.forEach(e => {
      if (!byDate[e.date] || Number(e.weight) > Number(byDate[e.date])) byDate[e.date] = Number(e.weight);
    });
    return Object.entries(byDate).sort((a,b) => a[0].localeCompare(b[0])).slice(-12);
  };

  // Trained days for calendar (last 5 weeks)
  const getTrainedDays = () => {
    const days = new Set(log.map(e => e.date));
    const bwDays = new Set(bodyWeight.map(e => e.date));
    return { workout: days, bw: bwDays };
  };

  // Simple SVG line chart
  function LineChart({ data, color = BLUE, unit = "kg" }) {
    if (data.length < 2) return <div style={{ color:"#334455", fontSize:13, textAlign:"center", padding:20 }}>Behöver minst 2 datapunkter</div>;
    const vals = data.map(d => d[1]);
    const min = Math.min(...vals) * 0.97;
    const max = Math.max(...vals) * 1.03;
    const w = 300, h = 120;
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * (w - 20) + 10;
      const y = h - ((d[1] - min) / (max - min)) * (h - 20) - 10;
      return `${x},${y}`;
    });
    const latest = data[data.length - 1];
    const first = data[0];
    const diff = latest[1] - first[1];
    return (
      <div>
        <svg viewBox={`0 0 ${w} ${h}`} style={{ width:"100%", height:120 }}>
          <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * (w - 20) + 10;
            const y = h - ((d[1] - min) / (max - min)) * (h - 20) - 10;
            return <circle key={i} cx={x} cy={y} r="4" fill={color}/>;
          })}
        </svg>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#334455", marginTop:4 }}>
          <span>{first[0]}</span>
          <span style={{ color: diff >= 0 ? "#50e090" : "#ff4466", fontWeight:700 }}>{diff >= 0 ? "+" : ""}{diff.toFixed(1)} {unit}</span>
          <span>{latest[0]}</span>
        </div>
      </div>
    );
  }

  async function addBodyWeight() {
    if (!bwForm.weight) return;
    try {
      const saved = await insertBodyWeight(bwForm);
      setBodyWeight(prev => [saved || { ...bwForm, id: uid() }, ...prev]);
      setBwForm(f => ({ ...f, weight: "" }));
    } catch(e) {
      setBodyWeight(prev => [{ ...bwForm, id: uid() }, ...prev]);
      setBwForm(f => ({ ...f, weight: "" }));
    }
  }

  async function removeBW(id) {
    try { await deleteBodyWeight(id); } catch(e) {}
    setBodyWeight(prev => prev.filter(b => b.id !== id));
  }

  const trainedDays = getTrainedDays();
  const bwData = [...bodyWeight].sort((a,b) => a.date.localeCompare(b.date)).slice(-12).map(e => [e.date, Number(e.weight)]);

  // Calendar – last 5 weeks
  function CalendarGrid() {
    const today = new Date();
    const days = [];
    for (let i = 34; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      days.push({ ds, day: d.getDate(), worked: trainedDays.workout.has(ds) });
    }
    const weekDays = ["M","T","O","T","F","L","S"];
    return (
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4, marginBottom:4 }}>
          {weekDays.map(d => <div key={d} style={{ textAlign:"center", fontSize:10, color:"#334455" }}>{d}</div>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {days.map(({ ds, day, worked }) => (
            <div key={ds} style={{ aspectRatio:"1", borderRadius:6, background: worked ? BLUE : "#111820", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:worked?800:400, color:worked?"#fff":"#334455" }}>
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const subTabs = [
    { id:"overview", label:"Översikt" },
    { id:"exercise", label:"Övning" },
    { id:"bodyweight", label:"Kroppsvikt" },
    { id:"calendar", label:"Kalender" },
  ];

  return (
    <div>
      {/* Sub tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:16, overflowX:"auto" }}>
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setStatsView(t.id)} style={{ padding:"7px 14px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:700, fontSize:12, whiteSpace:"nowrap", background: statsView===t.id ? `linear-gradient(135deg,${BLUE},${BLUE_DARK})` : "#111820", color: statsView===t.id ? "#fff" : "#4488aa" }}>{t.label}</button>
        ))}
      </div>

      {/* Overview */}
      {statsView==="overview" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
            <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 16px" }}>
              <div style={{ fontSize:10, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Pass totalt</div>
              <div style={{ fontSize:32, fontWeight:900, color:"#fff" }}>{new Set(log.map(e=>e.date)).size}</div>
            </div>
            <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 16px" }}>
              <div style={{ fontSize:10, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Set totalt</div>
              <div style={{ fontSize:32, fontWeight:900, color:"#fff" }}>{log.length}</div>
            </div>
            <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 16px" }}>
              <div style={{ fontSize:10, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Övningar</div>
              <div style={{ fontSize:32, fontWeight:900, color:"#fff" }}>{exercises.length}</div>
            </div>
            <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 16px" }}>
              <div style={{ fontSize:10, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Aktuell vikt</div>
              <div style={{ fontSize:32, fontWeight:900, color:BLUE }}>{bodyWeight[0]?.weight || "—"}<span style={{ fontSize:14, color:"#4488aa" }}> kg</span></div>
            </div>
          </div>

          {/* PRs */}
          <div style={{ fontSize:12, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>🏆 Personliga rekord</div>
          {exercises.length === 0 && <div style={{ color:"#223344", fontSize:13, textAlign:"center", padding:20 }}>Logga pass för att se rekord!</div>}
          {exercises.map(ex => {
            const pr = getPR(ex);
            if (!pr) return null;
            return (
              <div key={ex} style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:12, padding:"12px 16px", marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#c0d8f0" }}>{ex}</div>
                  <div style={{ fontSize:11, color:"#334455", marginTop:2 }}>{pr.date} · {pr.reps} reps</div>
                </div>
                <div style={{ fontSize:22, fontWeight:900, color:BLUE }}>{pr.weight} <span style={{ fontSize:13 }}>kg</span></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Exercise progress */}
      {statsView==="exercise" && (
        <div>
          <select value={selectedExercise} onChange={e => setSelectedExercise(e.target.value)} style={{ width:"100%", background:"#111820", border:`1px solid ${BLUE_DARK}`, borderRadius:12, padding:"10px 14px", color:"#fff", fontSize:14, fontWeight:700, outline:"none", marginBottom:16 }}>
            <option value="">Välj övning…</option>
            {exercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
          </select>
          {selectedExercise && (() => {
            const data = getProgressData(selectedExercise);
            const pr = getPR(selectedExercise);
            return (
              <div>
                <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:16, padding:"16px 18px", marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                    <div>
                      <div style={{ fontSize:10, color:"#3a6888", letterSpacing:2, textTransform:"uppercase" }}>Personligt rekord</div>
                      <div style={{ fontSize:28, fontWeight:900, color:BLUE }}>{pr?.weight} kg</div>
                      <div style={{ fontSize:11, color:"#334455" }}>{pr?.date} · {pr?.reps} reps</div>
                    </div>
                    <div style={{ fontSize:40 }}>🏆</div>
                  </div>
                  <LineChart data={data} color={BLUE} unit="kg"/>
                </div>
              </div>
            );
          })()}
          {!selectedExercise && <div style={{ color:"#223344", fontSize:13, textAlign:"center", padding:20 }}>Välj en övning för att se progress</div>}
        </div>
      )}

      {/* Body weight */}
      {statsView==="bodyweight" && (
        <div>
          <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:16, padding:18, marginBottom:16 }}>
            <div style={{ fontSize:12, color:BLUE, fontWeight:700, letterSpacing:1, marginBottom:12 }}>+ LOGGA KROPPSVIKT</div>
            <div style={{ display:"flex", gap:10 }}>
              <input type="date" value={bwForm.date} onChange={e => setBwForm(f => ({ ...f, date: e.target.value }))} style={{ ...inputStyle, flex:1, marginBottom:0 }}/>
              <input type="number" placeholder="Vikt (kg)" value={bwForm.weight} onChange={e => setBwForm(f => ({ ...f, weight: e.target.value }))} style={{ ...inputStyle, flex:1, marginBottom:0 }}/>
            </div>
            <button onClick={addBodyWeight} style={{ width:"100%", padding:"12px", borderRadius:12, background:`linear-gradient(135deg,${BLUE},${BLUE_DARK})`, color:"#fff", fontWeight:800, fontSize:14, border:"none", cursor:"pointer", marginTop:10 }}>Logga vikt</button>
          </div>

          {bwData.length >= 2 && (
            <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:16, padding:"16px 18px", marginBottom:16 }}>
              <div style={{ fontSize:11, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Viktprogression</div>
              <LineChart data={bwData} color="#50e090" unit="kg"/>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {bodyWeight.map(entry => (
              <div key={entry.id} style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontSize:11, color:"#334455" }}>{entry.date}</div>
                  <div style={{ fontSize:22, fontWeight:900, color:BLUE }}>{entry.weight} <span style={{ fontSize:13, color:"#4488aa" }}>kg</span></div>
                </div>
                <button onClick={() => removeBW(entry.id)} style={{ background:"#1a0a14", border:"none", color:"#ff4466", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:16 }}>✕</button>
              </div>
            ))}
            {bodyWeight.length === 0 && <div style={{ color:"#223344", fontSize:13, textAlign:"center", padding:20 }}>Inga vikter loggade ännu!</div>}
          </div>
        </div>
      )}

      {/* Calendar */}
      {statsView==="calendar" && (
        <div>
          <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:16, padding:"16px 18px", marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>📅 Senaste 5 veckorna</div>
            <CalendarGrid/>
            <div style={{ display:"flex", gap:12, marginTop:14, fontSize:11, color:"#334455" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:12, height:12, borderRadius:3, background:BLUE }}/> Träningsdag</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:12, height:12, borderRadius:3, background:"#111820" }}/> Vilodag</div>
            </div>
          </div>

          <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:14, padding:"14px 16px" }}>
            <div style={{ fontSize:11, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Senaste passen</div>
            {[...new Set(log.map(e => e.date))].sort((a,b) => b.localeCompare(a)).slice(0,10).map(date => {
              const dayLog = log.filter(e => e.date === date);
              const exs = [...new Set(dayLog.map(e => e.exercise))];
              return (
                <div key={date} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #1a2a3a" }}>
                  <div>
                    <div style={{ fontSize:12, color:BLUE, fontWeight:700 }}>{date}</div>
                    <div style={{ fontSize:11, color:"#4488aa", marginTop:2 }}>{exs.slice(0,3).join(", ")}{exs.length > 3 ? ` +${exs.length-3}` : ""}</div>
                  </div>
                  <div style={{ fontSize:12, color:"#334455" }}>{dayLog.length} set</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TraningApp() {
  const [tab, setTab] = useState("program");
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [selectedProgramId, setSelectedProgramId] = useState(DEFAULT_PROGRAMS[0].id);
  const [editMode, setEditMode] = useState(false);
  const [showNewProgram, setShowNewProgram] = useState(false);
  const [newProgramName, setNewProgramName] = useState("");
  const [addingExercise, setAddingExercise] = useState({});
  const [addingRest, setAddingRest] = useState({});
  const [log, setLog] = useState([]);
  const [bodyWeight, setBodyWeight] = useState([]);
  const [logForm, setLogForm] = useState({ date:new Date().toISOString().slice(0,10), exercise:"", sets:"", reps:"", weight:"" });
  const [restDuration, setRestDuration] = useState(60);
  const [activeDay, setActiveDay] = useState(null);
  const [passActive, setPassActive] = useState(false);
  const wakeLockRef = useRef(null);

  // Keep screen on during workout
  useEffect(() => {
    async function manageWakeLock() {
      if (passActive) {
        try {
          if ("wakeLock" in navigator) {
            wakeLockRef.current = await navigator.wakeLock.request("screen");
          }
        } catch(e) { console.log("Wake lock failed:", e); }
      } else {
        if (wakeLockRef.current) {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        }
      }
    }
    manageWakeLock();
  }, [passActive]);
  const [passSeconds, setPassSeconds] = useState(0);
  const passRef = useRef(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [loading, setLoading] = useState(true);

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMode, setTimerMode] = useState("stopwatch");
  const [countdownStart, setCountdownStart] = useState(60);
  const [intervals, setIntervals] = useState({ work:40, rest:20, rounds:8 });
  const [intervalPhase, setIntervalPhase] = useState("work");
  const [intervalRound, setIntervalRound] = useState(1);
  const [intervalRunning, setIntervalRunning] = useState(false);
  const [intervalTime, setIntervalTime] = useState(40);
  const [flashPhase, setFlashPhase] = useState(false);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  // ── Load data on mount ──
  useEffect(() => {
    async function loadAll() {
      try {
        const [savedPrograms, savedLog, savedBW] = await Promise.all([loadPrograms(), loadLog(), loadBodyWeight()]);
        if (savedPrograms && savedPrograms.length > 0) setPrograms(savedPrograms);
        if (savedLog) setLog(savedLog);
        if (savedBW) setBodyWeight(savedBW);
      } catch(e) {
        console.error("Load error:", e);
        // Keep default programs if load fails
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // ── Auto-save programs when they change ──
  const saveTimer = useRef(null);
  useEffect(() => {
    if (loading) return;
    clearTimeout(saveTimer.current);
    setSaveStatus("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        await savePrograms(programs);
        setSaveStatus("saved");
        setTimeout(()=>setSaveStatus("idle"), 2000);
      } catch(e) {
        console.error("Save error:", e);
        setSaveStatus("idle"); // Don't show error, just reset
      }
    }, 1000);
  }, [programs]);

  useEffect(() => {
    if (passActive) { passRef.current = setInterval(()=>setPassSeconds(s=>s+1),1000); }
    else clearInterval(passRef.current);
    return ()=>clearInterval(passRef.current);
  }, [passActive]);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(()=>{
        setTimerSeconds(s=>{ if(timerMode==="countdown"){if(s<=1){setTimerRunning(false);return 0;}return s-1;}return s+1; });
      },1000);
    } else clearInterval(timerRef.current);
    return()=>clearInterval(timerRef.current);
  }, [timerRunning, timerMode]);

  useEffect(() => {
    if (intervalRunning) {
      intervalRef.current = setInterval(()=>{
        setIntervalTime(t=>{
          if(t<=1){
            setFlashPhase(true); setTimeout(()=>setFlashPhase(false),600);
            setIntervalPhase(prev=>{
              if(prev==="work"){setIntervalTime(intervals.rest);return "rest";}
              else{setIntervalRound(r=>{if(r>=intervals.rounds){setIntervalRunning(false);return r;}return r+1;});setIntervalTime(intervals.work);return "work";}
            });
            return intervalPhase==="work"?intervals.rest:intervals.work;
          }
          return t-1;
        });
      },1000);
    } else clearInterval(intervalRef.current);
    return()=>clearInterval(intervalRef.current);
  }, [intervalRunning, intervals, intervalPhase]);

  function startWorkout(day) { setActiveDay(day); setPassActive(true); setPassSeconds(0); setTab("logg"); }
  function finishWorkout() { setActiveDay(null); setPassActive(false); setPassSeconds(0); }

  async function handleLogSet(entry) {
    try {
      const saved = await insertLog(entry);
      setLog(prev=>[saved||{...entry,id:uid()},...prev]);
    } catch(e) {
      setLog(prev=>[{...entry,id:uid()},...prev]);
    }
  }

  function addProgram() {
    if(!newProgramName.trim()) return;
    const np={id:uid(),name:newProgramName.trim(),days:[]};
    setPrograms(prev=>[...prev,np]); setSelectedProgramId(np.id); setNewProgramName(""); setShowNewProgram(false); setEditMode(true);
  }
  function deleteProgram(id){const r=programs.filter(p=>p.id!==id);setPrograms(r);if(selectedProgramId===id)setSelectedProgramId(r[0]?.id);}
  function addDay(pid){setPrograms(prev=>prev.map(p=>p.id!==pid?p:{...p,days:[...p.days,{id:uid(),day:`Dag ${(p.days.length+1)}`,focus:"",exercises:[]}]}));}
  function updateDay(pid,did,field,val){setPrograms(prev=>prev.map(p=>p.id!==pid?p:{...p,days:p.days.map(d=>d.id===did?{...d,[field]:val}:d)}));}
  function deleteDay(pid,did){setPrograms(prev=>prev.map(p=>p.id!==pid?p:{...p,days:p.days.filter(d=>d.id!==did)}));}
  function addExerciseToDay(pid,did){
    const val=(addingExercise[did]||"").trim(); if(!val) return;
    const rest = addingRest[did] || 60;
    setPrograms(prev=>prev.map(p=>p.id!==pid?p:{...p,days:p.days.map(d=>d.id===did?{...d,exercises:[...d.exercises,{name:val,rest:Number(rest)}]}:d)}));
    setAddingExercise(prev=>({...prev,[did]:""}));
  }
  function updateExerciseRest(pid,did,idx,val){
    setPrograms(prev=>prev.map(p=>p.id!==pid?p:{...p,days:p.days.map(d=>d.id===did?{...d,exercises:d.exercises.map((ex,i)=>i===idx?{...ex,rest:Number(val)}:ex)}:d)}));
  }
  function removeExercise(pid,did,idx){setPrograms(prev=>prev.map(p=>p.id!==pid?p:{...p,days:p.days.map(d=>d.id===did?{...d,exercises:d.exercises.filter((_,i)=>i!==idx)}:d)}));}

  async function addLog() {
    if(!logForm.exercise) return;
    if(!passActive){setPassActive(true);setPassSeconds(0);}
    await handleLogSet(logForm);
    setLogForm(f=>({...f,exercise:"",sets:"",reps:"",weight:""}));
  }
  async function deleteLog(id) {
    try { await deleteLogEntry(id); } catch(e) {}
    setLog(prev=>prev.filter(l=>l.id!==id));
  }

  function startTimer(){if(timerMode==="countdown")setTimerSeconds(countdownStart);setTimerRunning(true);}
  function resetTimer(){setTimerRunning(false);setTimerSeconds(timerMode==="countdown"?countdownStart:0);}
  function resetInterval(){setIntervalRunning(false);setIntervalPhase("work");setIntervalRound(1);setIntervalTime(intervals.work);}

  const selectedProgram=programs.find(p=>p.id===selectedProgramId)||programs[0];
  const tabs=[{id:"program",label:"Program",icon:"📋"},{id:"logg",label:"Loggbok",icon:"📝"},{id:"stats",label:"Statistik",icon:"📊"},{id:"timer",label:"Timer",icon:"⏱"}];

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#080c10", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
      <img src={LOGO_SRC} alt="FLX" style={{ height:70, objectFit:"contain", opacity:0.9 }}/>
      <div style={{ color:BLUE, fontSize:14, letterSpacing:3, textTransform:"uppercase" }}>Laddar…</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", width:"100%", background:"#080c10", color:"#d0e4f0", fontFamily:"'DM Sans','Segoe UI',sans-serif", display:"flex", flexDirection:"column", boxSizing:"border-box" }}>
      <style>{`html,body{background:#080c10!important;margin:0!important;padding:0!important;width:100%;overflow-x:hidden}*{box-sizing:border-box}`}</style>
      <div style={{ padding:"16px 20px 12px", background:"linear-gradient(180deg,#0d1520,#080c10)", borderBottom:"1px solid #1a2a3a" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src={LOGO_SRC} alt="FLX Performance" style={{ height:46, objectFit:"contain" }}/>
            <SaveBadge status={saveStatus}/>
          </div>
          {passActive && (
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10, color:"#3a7aaa", letterSpacing:2, textTransform:"uppercase" }}>Pass pågår</div>
                <div style={{ fontSize:20, fontWeight:900, color:BLUE, fontVariantNumeric:"tabular-nums" }}>{formatTime(passSeconds)}</div>
              </div>
              {!activeDay&&<button onClick={finishWorkout} style={{ background:"#1a0a14", border:"none", color:"#ff4466", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:12, fontWeight:700 }}>Avsluta</button>}
            </div>
          )}
        </div>
      </div>

      <div style={{ display:"flex", background:"#0d1117", borderBottom:"1px solid #1a2a3a" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"14px 0", background:"none", border:"none", borderBottom:tab===t.id?`2px solid ${BLUE}`:"2px solid transparent", color:tab===t.id?BLUE:"#334455", fontWeight:tab===t.id?700:400, fontSize:13, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, position:"relative" }}>
            <span style={{ fontSize:18 }}>{t.icon}</span>{t.label}
            {t.id==="logg"&&passActive&&<div style={{ width:6,height:6,borderRadius:"50%",background:"#50e090",position:"absolute",top:8,right:"30%" }}/>}
          </button>
        ))}
      </div>

      <div style={{ flex:1, padding:"20px 16px 100px", overflowY:"auto", width:"100%", boxSizing:"border-box" }}>

        {tab==="program"&&(
          <div>
            <div style={{ display:"flex", gap:8, marginBottom:14, alignItems:"center" }}>
              <select
                value={selectedProgramId}
                onChange={e => { setSelectedProgramId(Number(e.target.value)||e.target.value); setEditMode(false); }}
                style={{ flex:1, background:"#111820", border:`1px solid ${BLUE_DARK}`, borderRadius:12, padding:"10px 14px", color:"#fff", fontSize:14, fontWeight:700, outline:"none", cursor:"pointer", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300aaff' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center" }}
              >
                {programs.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button onClick={()=>setShowNewProgram(v=>!v)} style={{ padding:"10px 14px", borderRadius:12, background:"#0a1a10", color:"#50e090", border:"1px dashed #207050", cursor:"pointer", fontWeight:700, fontSize:13, whiteSpace:"nowrap" }}>+ Nytt</button>
            </div>
            {showNewProgram&&(
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                <input placeholder="Programnamn…" value={newProgramName} onChange={e=>setNewProgramName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addProgram()} style={{ ...ghostInput, flex:1, marginBottom:0 }}/>
                <button onClick={addProgram} style={{ ...smallBtn(`linear-gradient(135deg,${BLUE},${BLUE_DARK})`,"#fff"), padding:"7px 16px" }}>Skapa</button>
              </div>
            )}
            {selectedProgram&&(
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div style={{ fontSize:15, fontWeight:800, color:"#c0d8f0" }}>{selectedProgram.name}</div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>setEditMode(v=>!v)} style={smallBtn(editMode?BLUE_DIM:"#111820",editMode?BLUE:"#4488aa")}>{editMode?"✓ Klar":"✏️ Redigera"}</button>
                  {programs.length>1&&<button onClick={()=>deleteProgram(selectedProgram.id)} style={smallBtn("#1a0a0a","#ff4466")}>🗑</button>}
                </div>
              </div>
            )}
            {selectedProgram&&selectedProgram.days.map(d=>(
              <div key={d.id} style={card}>
                <div style={cardHeader}>
                  {editMode?(
                    <div style={{ display:"flex", gap:8, flex:1 }}>
                      <select value={d.day} onChange={e=>updateDay(selectedProgram.id,d.id,"day",e.target.value)} style={{ ...ghostInput, width:110, marginBottom:0 }}>
                        {DAYS_OF_WEEK.map(dw=><option key={dw}>{dw}</option>)}
                      </select>
                      <input placeholder="Fokus…" value={d.focus} onChange={e=>updateDay(selectedProgram.id,d.id,"focus",e.target.value)} style={{ ...ghostInput, flex:1, marginBottom:0 }}/>
                    </div>
                  ):(
                    <div>
                      <div style={{ fontSize:11, color:"#3a6888", letterSpacing:2, textTransform:"uppercase" }}>{d.day}</div>
                      <div style={{ fontSize:16, fontWeight:700, color:"#c0d8f0" }}>{d.focus||"Namnlöst pass"}</div>
                    </div>
                  )}
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    {!editMode&&<button onClick={()=>startWorkout(d)} style={{ background:`linear-gradient(135deg,${BLUE},${BLUE_DARK})`, border:"none", color:"#fff", borderRadius:10, padding:"7px 14px", cursor:"pointer", fontWeight:800, fontSize:13 }}>▶ Kör</button>}
                    {editMode&&<button onClick={()=>deleteDay(selectedProgram.id,d.id)} style={smallBtn("#1a0a0a","#ff4466")}>🗑</button>}
                  </div>
                </div>
                <div style={{ padding:"12px 18px" }}>
                  {d.exercises.map((ex,j)=>(
                    <div key={j} style={{ borderRadius:10, background:"#0a0e14", marginBottom:6, overflow:"hidden" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 10px" }}>
                        <div style={{ width:26, height:26, borderRadius:7, background:BLUE_DIM, color:BLUE, fontWeight:900, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{j+1}</div>
                        <span style={{ fontSize:14, color:"#b0cce0", flex:1 }}>{ex.name||ex}</span>
                        {!editMode && <span style={{ fontSize:11, color:"#3a6888", background:"#0d1520", borderRadius:6, padding:"2px 8px" }}>⏱ {ex.rest||60}s</span>}
                        {editMode&&<button onClick={()=>removeExercise(selectedProgram.id,d.id,j)} style={{ background:"none", border:"none", color:"#ff4466", cursor:"pointer", fontSize:15, padding:"0 4px" }}>✕</button>}
                      </div>
                      {editMode && (
                        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0 10px 8px 42px" }}>
                          <span style={{ fontSize:11, color:"#334455" }}>⏱ Vila</span>
                          {[30,60,90,120].map(sec=>(
                            <button key={sec} onClick={()=>updateExerciseRest(selectedProgram.id,d.id,j,sec)} style={{ padding:"3px 8px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontWeight:700, background:(ex.rest||60)===sec?BLUE:"#1a2a3a", color:(ex.rest||60)===sec?"#fff":"#4488aa" }}>{sec}s</button>
                          ))}
                          <input type="number" value={ex.rest||60} min={5} max={600} onChange={e=>updateExerciseRest(selectedProgram.id,d.id,j,e.target.value)} style={{ width:48, background:"#0a0e14", border:"1px solid #1a2a3a", borderRadius:6, padding:"3px 6px", color:"#d0e4f0", fontSize:12, outline:"none", textAlign:"center", fontWeight:700 }}/>
                        </div>
                      )}
                    </div>
                  ))}
                  {editMode&&(
                    <div style={{ marginTop:8 }}>
                      <div style={{ display:"flex", gap:8, marginBottom:6 }}>
                        <input placeholder="Ny övning…" value={addingExercise[d.id]||""} onChange={e=>setAddingExercise(prev=>({...prev,[d.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addExerciseToDay(selectedProgram.id,d.id)} style={{ ...ghostInput, flex:1, marginBottom:0 }}/>
                        <button onClick={()=>addExerciseToDay(selectedProgram.id,d.id)} style={{ ...smallBtn(`linear-gradient(135deg,${BLUE},${BLUE_DARK})`,"#fff"), padding:"7px 14px" }}>+ Lägg till</button>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, paddingLeft:4 }}>
                        <span style={{ fontSize:11, color:"#334455" }}>⏱ Vila för ny övning</span>
                        {[30,60,90,120].map(sec=>(
                          <button key={sec} onClick={()=>setAddingRest(prev=>({...prev,[d.id]:sec}))} style={{ padding:"3px 8px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontWeight:700, background:(addingRest[d.id]||60)===sec?BLUE:"#1a2a3a", color:(addingRest[d.id]||60)===sec?"#fff":"#4488aa" }}>{sec}s</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {editMode&&<button onClick={()=>addDay(selectedProgram.id)} style={{ width:"100%", padding:"13px", borderRadius:14, background:"#0a0e14", border:`1px dashed ${BLUE_DARK}`, color:BLUE, fontWeight:700, fontSize:14, cursor:"pointer", marginTop:4 }}>+ Lägg till dag</button>}
            {selectedProgram&&selectedProgram.days.length===0&&!editMode&&(
              <div style={{ textAlign:"center", color:"#223344", padding:40, fontSize:14 }}>Inga pass ännu.<br/>Tryck på <strong style={{ color:BLUE }}>✏️ Redigera</strong> för att lägga till!</div>
            )}
          </div>
        )}

        {tab==="logg"&&(
          <div>
            {activeDay?(
              <ActiveWorkout day={activeDay} log={log} onLogSet={handleLogSet} onFinish={finishWorkout} passSeconds={passSeconds} restDuration={restDuration} setRestDuration={setRestDuration}/>
            ):(
              <div>
                <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:18, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:BLUE, marginBottom:14, letterSpacing:1 }}>+ MANUELL LOGG</div>
                  <input type="date" value={logForm.date} onChange={e=>setLogForm(f=>({...f,date:e.target.value}))} style={inputStyle}/>
                  <input placeholder="Övning" value={logForm.exercise} onChange={e=>setLogForm(f=>({...f,exercise:e.target.value}))} style={inputStyle}/>
                  <div style={{ display:"flex", gap:10 }}>
                    <input placeholder="Set" value={logForm.sets} type="number" onChange={e=>setLogForm(f=>({...f,sets:e.target.value}))} style={{ ...inputStyle, flex:1 }}/>
                    <input placeholder="Reps" value={logForm.reps} type="number" onChange={e=>setLogForm(f=>({...f,reps:e.target.value}))} style={{ ...inputStyle, flex:1 }}/>
                    <input placeholder="Vikt (kg)" value={logForm.weight} type="number" onChange={e=>setLogForm(f=>({...f,weight:e.target.value}))} style={{ ...inputStyle, flex:1 }}/>
                  </div>
                  <button onClick={addLog} style={{ width:"100%", padding:"14px", borderRadius:12, background:`linear-gradient(135deg,${BLUE},${BLUE_DARK})`, color:"#fff", fontWeight:800, fontSize:15, border:"none", cursor:"pointer", marginTop:6 }}>Logga övning</button>
                  <RestTimer restDuration={restDuration} setRestDuration={setRestDuration}/>
                </div>
                {log.length===0?(
                  <div style={{ textAlign:"center", color:"#223344", padding:40, fontSize:14 }}>Inga loggade pass ännu.<br/>Starta ett pass från Program-fliken!</div>
                ):(
                  <div>
                    <div style={{ fontSize:12, color:"#3a6888", letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Historik</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {log.map(entry=>(
                        <div key={entry.id} style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:14, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <div>
                            <div style={{ fontSize:11, color:"#334455", marginBottom:2 }}>{entry.date}</div>
                            <div style={{ fontWeight:700, fontSize:15, color:"#c0d8f0" }}>{entry.exercise}</div>
                            <div style={{ fontSize:13, color:"#446688", marginTop:3 }}>
                              {entry.sets&&`${entry.sets} set`}{entry.reps&&` × ${entry.reps} reps`}
                              {entry.weight&&<span style={{ color:BLUE, marginLeft:8, fontWeight:700 }}>{entry.weight} kg</span>}
                            </div>
                          </div>
                          <button onClick={()=>deleteLog(entry.id)} style={{ background:"#1a0a14", border:"none", color:"#ff4466", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:16 }}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab==="stats"&&(
          <StatsTab log={log} bodyWeight={bodyWeight} setBodyWeight={setBodyWeight} insertBodyWeight={insertBodyWeight} deleteBodyWeight={deleteBodyWeight}/>
        )}

        {tab==="timer"&&(
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:24 }}>
              {["stopwatch","countdown","interval"].map(m=>(
                <button key={m} onClick={()=>{setTimerMode(m);resetTimer();resetInterval();}} style={{ flex:1, padding:"10px 4px", borderRadius:12, background:timerMode===m?`linear-gradient(135deg,${BLUE},${BLUE_DARK})`:"#111820", color:timerMode===m?"#fff":"#4488aa", border:"none", cursor:"pointer", fontWeight:700, fontSize:12, textTransform:"uppercase", letterSpacing:1 }}>
                  {m==="stopwatch"?"Stoppur":m==="countdown"?"Nedräkning":"Intervall"}
                </button>
              ))}
            </div>
            {timerMode==="stopwatch"&&(
              <div style={timerCard}>
                <div style={bigTime}>{formatTime(timerSeconds)}</div>
                <div style={{ display:"flex", gap:12, marginTop:28 }}>
                  <button onClick={()=>setTimerRunning(r=>!r)} style={timerBtn(`linear-gradient(135deg,${BLUE},${BLUE_DARK})`)}>{timerRunning?"⏸ Pausa":"▶ Starta"}</button>
                  <button onClick={()=>{setTimerRunning(false);setTimerSeconds(0);}} style={timerBtn("#1a2a3a")}>↺ Nollställ</button>
                </div>
              </div>
            )}
            {timerMode==="countdown"&&(
              <div style={timerCard}>
                {!timerRunning&&(
                  <div style={{ marginBottom:20 }}>
                    <label style={{ color:"#3a6888", fontSize:12, letterSpacing:2 }}>SEKUNDER</label>
                    <input type="number" value={countdownStart} min={5} max={3600} onChange={e=>{setCountdownStart(Number(e.target.value));setTimerSeconds(Number(e.target.value));}} style={{ ...inputStyle, fontSize:28, fontWeight:800, textAlign:"center", color:"#fff", marginTop:8 }}/>
                  </div>
                )}
                <div style={{ ...bigTime, color:timerSeconds<=5&&timerRunning?"#ff4466":"#fff" }}>{formatTime(timerSeconds)}</div>
                {timerSeconds===0&&<div style={{ color:BLUE, fontWeight:800, marginTop:12, fontSize:20 }}>✅ Klar!</div>}
                <div style={{ display:"flex", gap:12, marginTop:28 }}>
                  <button onClick={()=>timerRunning?setTimerRunning(false):startTimer()} style={timerBtn(`linear-gradient(135deg,${BLUE},${BLUE_DARK})`)}>{timerRunning?"⏸ Pausa":"▶ Starta"}</button>
                  <button onClick={resetTimer} style={timerBtn("#1a2a3a")}>↺ Nollställ</button>
                </div>
              </div>
            )}
            {timerMode==="interval"&&(
              <div>
                {!intervalRunning&&(
                  <div style={{ background:"#0d1117", border:"1px solid #1a2a3a", borderRadius:18, padding:20, marginBottom:18 }}>
                    <div style={{ fontSize:12, color:BLUE, fontWeight:700, letterSpacing:2, marginBottom:14 }}>INSTÄLLNINGAR</div>
                    <div style={{ display:"flex", gap:10 }}>
                      {[{label:"Arbete (s)",key:"work"},{label:"Vila (s)",key:"rest"},{label:"Rundor",key:"rounds"}].map(field=>(
                        <div key={field.key} style={{ flex:1 }}>
                          <label style={{ fontSize:10, color:"#334455", letterSpacing:1 }}>{field.label}</label>
                          <input type="number" value={intervals[field.key]} min={1} onChange={e=>setIntervals(prev=>({...prev,[field.key]:Number(e.target.value)}))} style={{ ...inputStyle, textAlign:"center", fontWeight:700 }}/>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ ...timerCard, background:flashPhase?(intervalPhase==="work"?"#0a0a20":"#0a1a0a"):"#0d1117", transition:"background 0.3s" }}>
                  <div style={{ fontSize:11, letterSpacing:4, color:intervalPhase==="work"?BLUE:"#50e0a0", marginBottom:6, textTransform:"uppercase" }}>
                    {intervalPhase==="work"?"⚡ Arbete":"💤 Vila"}
                  </div>
                  <div style={{ ...bigTime, color:intervalPhase==="work"?"#fff":"#50e0a0" }}>{formatTime(intervalTime)}</div>
                  <div style={{ color:"#334455", marginTop:10, fontSize:14 }}>Runda <span style={{ color:BLUE, fontWeight:800 }}>{intervalRound}</span> / {intervals.rounds}</div>
                  <div style={{ display:"flex", gap:12, marginTop:24 }}>
                    <button onClick={()=>setIntervalRunning(r=>!r)} style={timerBtn(intervalPhase==="work"?`linear-gradient(135deg,${BLUE},${BLUE_DARK})`:"#207050")}>{intervalRunning?"⏸ Pausa":"▶ Starta"}</button>
                    <button onClick={resetInterval} style={timerBtn("#1a2a3a")}>↺ Nollställ</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
