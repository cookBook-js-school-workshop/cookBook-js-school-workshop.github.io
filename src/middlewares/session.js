import { getUserData } from "../util.js";

// export default function addSession(ctx, next) {
//     if(ctx.user == undefined) {
//         updateSession.call(ctx);
//     }

//     ctx.updateSession = updateSession.bind(ctx);
//     next();
// }

// function updateSession() {
//     this.user = getUserData()
// }

export default function initialize() {
    let user = null;
    updateSession();

    return function (ctx, next) {
        ctx.updateSession = updateSession;
        ctx.user = user;

        next();
    };

    function updateSession() {
        user = getUserData();
    };
}
