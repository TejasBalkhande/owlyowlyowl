module.exports=[55806,a=>{"use strict";var b=a.i(37936),c=a.i(5246),d=a.i(90365);a.i(70396);var e=a.i(73727);async function f(){let{client:a}=(0,d.getDb)();await a.execute(`
    CREATE TABLE IF NOT EXISTS user_roadmap_order (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      order_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)}async function g(){let{client:a}=(0,d.getDb)();await a.execute(`
    CREATE TABLE IF NOT EXISTS user_practice_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      level_id INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      time_seconds INTEGER NOT NULL,
      total_time_seconds INTEGER NOT NULL,
      last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, level_id)
    )
  `)}async function h(){let a=await (0,c.cookies)(),b=a.get("session")?.value;if(!b)return null;let{client:e}=(0,d.getDb)(),f=await e.execute({sql:"SELECT id FROM users WHERE username = ?",args:[b]});return 0===f.rows.length?null:f.rows[0].id}async function i(){let a=await h();if(!a)return null;let{client:b}=(0,d.getDb)();await f();try{let c=await b.execute({sql:"SELECT order_data FROM user_roadmap_order WHERE user_id = ?",args:[a]});if(0===c.rows.length)return null;let d=c.rows[0].order_data;return JSON.parse(d)}catch(a){return console.error("Failed to get user roadmap order",a),null}}async function j(a){let b=await h();b||(0,e.redirect)("/account");let{client:c}=(0,d.getDb)();await f();try{let d=JSON.stringify(a);await c.execute({sql:`
        INSERT INTO user_roadmap_order (user_id, order_data, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET
          order_data = excluded.order_data,
          updated_at = excluded.updated_at
      `,args:[b,d]})}catch(a){throw console.error("Failed to save user roadmap order",a),Error("Could not save roadmap order")}}async function k(){let a=await h();if(!a)return null;let{client:b}=(0,d.getDb)();await g();try{let c=await b.execute({sql:`SELECT level_id, correct_count, total_questions, time_seconds, last_attempt
            FROM user_practice_results
            WHERE user_id = ?`,args:[a]}),d={};for(let a of c.rows)d[a.level_id]={correct:a.correct_count,total:a.total_questions,timeSeconds:a.time_seconds,lastAttempt:a.last_attempt};return d}catch(a){return console.error("Failed to get user practice results",a),null}}async function l(a,b,c,e){let f=await h();if(!f)return{success:!1,error:"User not logged in"};let{client:i}=(0,d.getDb)();await g();try{return await i.execute({sql:`
        INSERT INTO user_practice_results (user_id, level_id, correct_count, total_questions, time_seconds, total_time_seconds, last_attempt, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, level_id) DO UPDATE SET
          correct_count = excluded.correct_count,
          total_questions = excluded.total_questions,
          time_seconds = excluded.time_seconds,
          total_time_seconds = total_time_seconds + excluded.time_seconds,
          last_attempt = excluded.last_attempt,
          updated_at = excluded.updated_at
      `,args:[f,a,b,c,e,e]}),{success:!0}}catch(a){return console.error("Failed to save practice result",a),{success:!1,error:"Database error"}}}(0,a.i(13095).ensureServerEntryExports)([i,j,k,l]),(0,b.registerServerReference)(i,"00576caebd671529709346ff4cf8a37aff76c938d6",null),(0,b.registerServerReference)(j,"40a2816932cf388c2be527a1d8416d835b0405bf83",null),(0,b.registerServerReference)(k,"002e985439b27bcd7790e815b8430bf73ef0e01ae6",null),(0,b.registerServerReference)(l,"7840c08ba6eadbf8f00663323d665483a8c84da7a2",null),a.s(["getUserPracticeResults",()=>k,"getUserRoadmapOrder",()=>i,"savePracticeResult",()=>l,"saveUserRoadmapOrder",()=>j])},56752,a=>{"use strict";var b=a.i(55806);a.s([],47387),a.i(47387),a.s(["002e985439b27bcd7790e815b8430bf73ef0e01ae6",()=>b.getUserPracticeResults,"00576caebd671529709346ff4cf8a37aff76c938d6",()=>b.getUserRoadmapOrder,"40a2816932cf388c2be527a1d8416d835b0405bf83",()=>b.saveUserRoadmapOrder,"7840c08ba6eadbf8f00663323d665483a8c84da7a2",()=>b.savePracticeResult],56752)}];

//# sourceMappingURL=_c0e59451._.js.map