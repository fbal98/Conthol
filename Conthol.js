

class Conthol {
    constructor(backend) {
        this.backend = backend;
        this.LOG_LEVEL = {
            LOG: "log",
            ERROR: "error",
            WARN: "warn",
            DEBUG: "debug",
            INFO: "info"
        }
    }

    log(event) {
        this.backend.persist(LOG_LEVELS.LOG, event)
    }

    error(event) {
        this.backend.persist(LOG_LEVELS.ERROR, event)
    }

    warn(event) {
        this.backend.persist(LOG_LEVELS.WARN, event)
    }

    debug(event) {
        this.backend.persist(LOG_LEVELS.DEBUG, event)
    }

    info(event) {
        this.backend.persist(LOG_LEVELS.INFO, event)

    }

    //log with custom level
    logCustom(level, event) {
        this.backend.persist(level, event)
    }
}
//interface for all backends
class Backend {

    constructor() {
        if (this.constructor === Backend) {
            throw new Error("Cannot instantiate abstract class")
        }
    }

    persist() {
        throw new Error("persist not implemented")
    }

}

class ConsoleBackend extends Backend {
    constructor() {
        super()
    }

    persist(level, event) {
        if (Object.values(this.LOG_LEVEL).includes(level)) {
            console[level](event)
            return true
        }


        //custom level
        console.log(`[${level}] ${event}`)

    }
}


const cb = new ConsoleBackend()

const conthol = new Conthol(cb)

conthol.logCustom("custom", "custom log")
