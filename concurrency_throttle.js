class Queue {
  constructor(params) {
    this.concurrency = params['concurrency']
    this.jobs = []
    this.run_queue = this.run_queue.bind(this)
  }

  add(async_jobs) {
    this.jobs = async_jobs
  }

  start() {
    this.execute(0, this.concurrency)
  }

  execute(first_job, last_job) {
    this.jobs.splice(first, last).forEach((j) => { //takes given count of async jobs and executes them immidietly and cuts them from the queue
      j().then(() => this.execute(0, 1)) //as soon as any of the looped requests succeeds, it'll cut the first available request in the queue and execute it
    })
  }
}