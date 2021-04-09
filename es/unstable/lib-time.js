/**
 * Formats date as `YYYY-MM-DD HH:mm:ss` by default, otherwise outputs
 * `????-??-?? ??:??:??`.
 *
 * TODO: at some point rename this function.
 *
 * @param {number} time Unix time in milliseconds
 */
export function formatDate(time) {
  if (!Number.isFinite(time)) {
    return "????-??-?? ??:??:??";
  }

  const s = new Date(time).toJSON();
  const d = `${s.substring(0, 10)} ${s.substring(11, 23)}`;

  return d;
}

/**
 * Returns time formatted as `d HH:mm:ss.SSS` where `d` is the nr. of days, `H`
 * is the nr. of hours, `m` is the nr. of minutes, `s` is the number of seconds
 * and `S` is the number of milliseconds.
 *
 * TODO: at some point rename this function.
 *
 * @param {number} time Time in milliseconds.
 */
export function formatTime(time) {
  // TODO: at some point in the future make this cod
  let t = time;

  let x_ms = 0;
  let x_s = 0;
  let x_m = 0;
  let x_h = 0;
  let x_d = 0;

  let level = 0;

  // Remove microseconds and nano-seconds
  t = Math.floor(t);

  // Time is now in milliseconds

  if (t > 0) {
    x_ms = t % 1000;

    t = Math.floor((t - x_ms) / 1000);

    level += 1;
  }

  // Time is now in seconds

  if (t > 0) {
    x_s = t % 60;

    t = Math.floor((t - x_s) / 60);

    level += 1;
  }

  // Time is now in minutes

  if (t > 0) {
    x_m = t % 60;

    t = Math.floor((t - x_m) / 60);

    level += 1;
  }

  // Time is now in hours

  if (t > 0) {
    x_h = t % 24;

    t = Math.floor((t - x_h) / 24);

    level += 1;
  }

  // Time is now in days

  if (t > 0) {
    x_d = t;

    t = 0;

    level += 1;
  }

  const ms = `${x_ms}`.padStart(3, "0");
  const s = `${x_s}`.padStart(2, "0");
  const m = `${x_m}`.padStart(2, "0");
  const h = `${x_h}`.padStart(2, "0");
  const d = `${x_d}`;

  const msg = `${d} ${h}:${m}:${s}.${ms}`;

  return msg;
}
