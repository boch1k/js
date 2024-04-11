const indexField = new Map()
let strId = ""
let mamba = 2 // choice first player, 1 - X ; 2 - O
let player
const winArr = []
winLine = 2 // length line for victory



const collection = document.getElementsByTagName("td");
for (let n = 0; n < collection.length; n++) {
    collection.item(n).addEventListener('click', function () {
        strId = this.id;
        checkId(Number(strId))

    })
};

function checkId(a) {
    if (indexField.has(a)) {
        console.log("already use")
        return
    };
    mamba % 2 ? player = "X" : player = "O"
    mamba++
    indexField.set(a, player)
    let changer = document.getElementById(strId)
    changer.innerText = player
    checkler(...strId)
}

const onePoint = {
    left(a) { return a - 1 },
    right(a) { return a + 1 },
    up(a) { return a - 10 },
    down(a) { return a + 10 },
    dole(a) { return a + 9 },
    uple(a) { return a - 11 },
    upri(a) { return a - 9 },
    dori(a) { return a + 11 },
};

const left = wrapFn(onePoint.left)
const right = wrapFn(onePoint.right)
const up = wrapFn(onePoint.up)
const down = wrapFn(onePoint.down)
const dole = wrapFn(onePoint.dole)
const uple = wrapFn(onePoint.uple)
const upri = wrapFn(onePoint.upri)
const dori = wrapFn(onePoint.dori)
const up_down = wrap2Fn(onePoint.up, onePoint.down)
const left_right = wrap2Fn(onePoint.left, onePoint.right)
const uple_dori = wrap2Fn(onePoint.uple, onePoint.dori)
const upri_dole = wrap2Fn(onePoint.upri, onePoint.dole)

function chkFn(func) {
    return function checkHop(point) {
        let nextHop = func(point) // onePoint()
        if (indexField.get(nextHop) == player) {
            winArr.push(nextHop)
            if (winArr.length == winLine) {
                return alert(`player ${player} win!`)
            }
            checkHop(nextHop)
        }
    }
}

function wrapFn(fn) {
    return function (a) {
        let inFn = chkFn(fn)
        inFn(a)
        winArr.length = 0;
    }
}

function wrap2Fn(fn1, fn2) {
    return function (a) {
        let inFn1 = chkFn(fn1)
        let inFn2 = chkFn(fn2)
        inFn1(a) // checkHop(5) left
        inFn2(a) // checkHop(5) right
        winArr.length = 0;
    }
}

function checkler(a, b) {
    if (a == "0" && b == "0") {
        right(Number(strId))
        dori(Number(strId))
        down(Number(strId))
    } else if (a == "0" && b == "2") {
        left(Number(strId))
        dole(Number(strId))
        down(Number(strId))
    } else if (a == "2" && b == "0") {
        up(Number(strId))
        upri(Number(strId))
        right(Number(strId))
    } else if (a == "2" && b == "2") {
        up(Number(strId))
        uple(Number(strId))
        left(Number(strId))
    } else if (a == "0" && (b !== "0" && b !== "2")) {
        left_right(Number(strId))
        dole(Number(strId))
        down(Number(strId))
        dori(Number(strId))
    } else if ((a !== 0 && a !== "2") && b == 0) {
        up_down(Number(strId))
        upri(Number(strId))
        right(Number(strId))
        dori(Number(strId))
    } else if ((a !== 0 && a !== "2") && b == "2") {
        up_down(Number(strId))
        uple(Number(strId))
        left(Number(strId))
        dole(Number(strId))
    } else if (a == "2" && (b !== 0 && b == "2")) {
        left_right(Number(strId))
        uple(Number(strId))
        up(Number(strId))
        upri(Number(strId))
    } else {
        up_down(Number(strId))
        left_right(Number(strId))
        uple_dori(Number(strId))
        upri_dole(Number(strId))
    }
}
