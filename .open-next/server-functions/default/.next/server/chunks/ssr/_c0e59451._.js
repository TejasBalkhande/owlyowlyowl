module.exports=[55806,a=>{"use strict";var b=a.i(37936),c=a.i(5246),d=a.i(90365);a.i(70396);var e=a.i(73727);async function f(){let{client:a}=(0,d.getDb)();await a.execute(`
    CREATE TABLE IF NOT EXISTS user_roadmap_order (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      order_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)}async function g(){let a=await (0,c.cookies)(),b=a.get("session")?.value;if(!b)return null;let{client:e}=(0,d.getDb)();await f();try{let a=await e.execute({sql:"SELECT id FROM users WHERE username = ?",args:[b]});if(0===a.rows.length)return null;let c=a.rows[0].id,d=await e.execute({sql:"SELECT order_data FROM user_roadmap_order WHERE user_id = ?",args:[c]});if(0===d.rows.length)return null;let f=d.rows[0].order_data;return JSON.parse(f)}catch(a){return console.error("Failed to get user roadmap order",a),null}}async function h(a){let b=await (0,c.cookies)(),g=b.get("session")?.value;g||(0,e.redirect)("/account");let{client:h}=(0,d.getDb)();await f();try{let b=await h.execute({sql:"SELECT id FROM users WHERE username = ?",args:[g]});if(0===b.rows.length)throw Error("User not found");let c=b.rows[0].id,d=JSON.stringify(a);await h.execute({sql:`
        INSERT INTO user_roadmap_order (user_id, order_data, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET
          order_data = excluded.order_data,
          updated_at = excluded.updated_at
      `,args:[c,d]})}catch(a){throw console.error("Failed to save user roadmap order",a),Error("Could not save roadmap order")}}(0,a.i(13095).ensureServerEntryExports)([g,h]),(0,b.registerServerReference)(g,"00576caebd671529709346ff4cf8a37aff76c938d6",null),(0,b.registerServerReference)(h,"40a2816932cf388c2be527a1d8416d835b0405bf83",null),a.s(["getUserRoadmapOrder",()=>g,"saveUserRoadmapOrder",()=>h])},56752,a=>{"use strict";var b=a.i(55806);a.s([],47387),a.i(47387),a.s(["00576caebd671529709346ff4cf8a37aff76c938d6",()=>b.getUserRoadmapOrder,"40a2816932cf388c2be527a1d8416d835b0405bf83",()=>b.saveUserRoadmapOrder],56752)}];

//# sourceMappingURL=_c0e59451._.js.map