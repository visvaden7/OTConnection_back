const {Ip, Post, VirtualCasting} = require("../models");
exports.getPostType = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("test",id)
        const getType = await Post.findOne({
            where:{post_id: id},
            attributes: ['type']
        })

        const type = {type: getType.dataValues.type}
        res.json(type)
    } catch (err) {
        console.log(err)
    }
}

exports.getComparePostDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const getIpId = await Post.findOne({
            where: {post_id: id},
            attributes: ['ip_id']
        })
        const ip_id = getIpId.dataValues.ip_id

        const ipDetailInfo = await Ip.findOne({
            where: {ip_id},
            attributes: ['ip_id', 'title', 'webtoon_title', 'webtoon_platform', 'webtoon_start_date', 'webtoon_end_date', 'total_views', 'rating', 'release_date', 'watch_time', 'imdb_rating', 'webtoon_highlight', 'ott_highlight', 'diff_ott_webtoon', 'compare_youtube_url']
        })
        console.log(ipDetailInfo)
        if (!ipDetailInfo) {
            return res.status(404).json({error: "Ip not found"})
        }
        const ipData = ipDetailInfo.dataValues

        const {
            title,
            webtoon_title,
            webtoon_platform,
            webtoon_start_date,
            webtoon_end_date,
            total_views,
            rating,
            release_date,
            watch_time,
            imdb_rating,
            webtoon_highlight,
            ott_highlight,
            diff_ott_webtoon,
            compare_youtube_url
        } = ipData
        const result = {
            title,
            webtoon_title,
            webtoon_platform,
            webtoon_start_date,
            webtoon_end_date,
            total_views,
            rating,
            release_date,
            watch_time,
            imdb_rating,
            webtoon_highlight: webtoon_highlight ? webtoon_highlight.split(',') : [],
            ott_highlight: ott_highlight ? ott_highlight.split(',') : [],
            diff_ott_webtoon: diff_ott_webtoon ? diff_ott_webtoon.split('.') : [],
            compare_youtube_url
        }
        res.json(result)
    } catch (err) {
        console.log("Error get IP Detail", err)
        res.status(500).json({error: "Server Error"})
    }
}

exports.getPost = async (req, res) => {
    try {
        const typeGroup = ["compare", "v_casting"];

        // Post 데이터 가져오기
        const postList = await Post.findAll({
            where: {
                type: typeGroup
            }
        });

        console.log("test")

        // postList에서 ip_id를 기반으로 Ip 정보를 불러와 함께 매핑
        const mappedPostData = await Promise.all(postList.map(async post => {
            const ipDetailInfo = await Ip.findOne({
                where: {ip_id: post.dataValues.ip_id},
                attributes: [
                    'ip_id', 'title', 'webtoon_title', 'webtoon_platform',
                    'webtoon_start_date', 'webtoon_end_date', 'total_views',
                    'rating', 'release_date', 'watch_time', 'imdb_rating',
                    'webtoon_highlight', 'ott_highlight', 'diff_ott_webtoon',
                    'compare_youtube_url'
                ]
            });

            const virtualCastingInfoDetail = await VirtualCasting.findOne({
                where: {virtual_casting_id: post.dataValues.virtual_casting_id}  // virtual_casting_id로 검색
            });

            // post와 ipDetailInfo 데이터 매핑
            return {
                post_id: post.dataValues.post_id,
                com_id: post.dataValues.com_id,
                ip_id: post.dataValues.ip_id,
                type: post.dataValues.type, // type을 추가
                ip_info: ipDetailInfo ? {
                    title: ipDetailInfo.title,
                    webtoon_title: ipDetailInfo.webtoon_title,
                    webtoon_platform: ipDetailInfo.webtoon_platform,
                    webtoon_start_date: ipDetailInfo.webtoon_start_date,
                    webtoon_end_date: ipDetailInfo.webtoon_end_date,
                    total_views: ipDetailInfo.total_views,
                    rating: ipDetailInfo.rating,
                    release_date: ipDetailInfo.release_date,
                    watch_time: ipDetailInfo.watch_time,
                    imdb_rating: ipDetailInfo.imdb_rating,
                    webtoon_highlight: ipDetailInfo.webtoon_highlight ? ipDetailInfo.webtoon_highlight.split(',') : [],
                    ott_highlight: ipDetailInfo.ott_highlight ? ipDetailInfo.ott_highlight.split(',') : [],
                    diff_ott_webtoon: ipDetailInfo.diff_ott_webtoon ? ipDetailInfo.diff_ott_webtoon.split('.') : [],
                    compare_youtube_url: ipDetailInfo.compare_youtube_url
                } : null,
                v_info: virtualCastingInfoDetail ? {
                        virtual_casting_title: virtualCastingInfoDetail.virtual_casting_title,
                        virtual_casting_image_url: virtualCastingInfoDetail.virtual_casting_image_url,
                        char_main: virtualCastingInfoDetail.char_main,
                        char_main_url: virtualCastingInfoDetail.char_main_url,
                        char_sub1: virtualCastingInfoDetail.char_sub1,
                        char_sub1_url: virtualCastingInfoDetail.char_sub1_url,
                        char_sub2: virtualCastingInfoDetail.char_sub2,
                        char_sub2_url: virtualCastingInfoDetail.char_sub2_url,
                        char_sub3: virtualCastingInfoDetail.char_sub3,
                        char_sub3_url: virtualCastingInfoDetail.char_sub3_url,
                        actor_main_casting1: virtualCastingInfoDetail.actor_main_casting1,
                        actor_main_casting1_recommend: virtualCastingInfoDetail.actor_main_casting1_recommend,
                        actor_main_casting1_url: virtualCastingInfoDetail.actor_main_casting1_url,
                        actor_main_casting2: virtualCastingInfoDetail.actor_main_casting2,
                        actor_main_casting2_recommend: virtualCastingInfoDetail.actor_main_casting2_recommend,
                        actor_main_casting2_url: virtualCastingInfoDetail.actor_main_casting2_url,
                        actor_sub1_casting1: virtualCastingInfoDetail.actor_sub1_casting1,
                        actor_sub1_casting1_recommend: virtualCastingInfoDetail.actor_sub1_casting1_recommend,
                        actor_sub1_casting1_url: virtualCastingInfoDetail.actor_sub1_casting1_url,
                        actor_sub1_casting2: virtualCastingInfoDetail.actor_sub1_casting2,
                        actor_sub1_casting2_recommend: virtualCastingInfoDetail.actor_sub1_casting2_recommend,
                        actor_sub1_casting2_url: virtualCastingInfoDetail.actor_sub1_casting2_url,
                        actor_sub2_casting1: virtualCastingInfoDetail.actor_sub2_casting1,
                        actor_sub2_casting1_recommend: virtualCastingInfoDetail.actor_sub2_casting1_recommend,
                        actor_sub2_casting1_url: virtualCastingInfoDetail.actor_sub2_casting1_url,
                        actor_sub2_casting2: virtualCastingInfoDetail.actor_sub2_casting2,
                        actor_sub2_casting2_recommend: virtualCastingInfoDetail.actor_sub2_casting2_recommend,
                        actor_sub2_casting2_url: virtualCastingInfoDetail.actor_sub2_casting2_url,
                        actor_sub3_casting1: virtualCastingInfoDetail.actor_sub3_casting1,
                        actor_sub3_casting1_recommend: virtualCastingInfoDetail.actor_sub3_casting1_recommend,
                        actor_sub3_casting1_url: virtualCastingInfoDetail.actor_sub3_casting1_url,
                        actor_sub3_casting2: virtualCastingInfoDetail.actor_sub3_casting2,
                        actor_sub3_casting2_recommend: virtualCastingInfoDetail.actor_sub3_casting2_recommend,
                        actor_sub3_casting2_url: virtualCastingInfoDetail.actor_sub3_casting2_url
                    }
                    : null

            };
        }));

        // 데이터를 type별로 분류
        const result = typeGroup.reduce((acc, type) => {
            acc[type] = mappedPostData.filter(post => post.type === type);
            return acc;
        }, {});

        // 결과 로그와 응답
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: '서버 오류가 발생했습니다.'});
    }
};


exports.getComparePost = async (req, res) => {
    try {
        const postList = await Post.findAll({
            where: {type: "compare"}
        });

        // postList에서 ip_id를 기반으로 ip 정보를 가져옴
        const postWithIpDetails = await Promise.all(postList.map(async (post) => {
            // ip_id로 ip 정보를 불러옴
            const ipDetailInfo = await Ip.findOne({
                where: {ip_id: post.dataValues.ip_id},
                attributes: [
                    'ip_id', 'title', 'webtoon_title', 'webtoon_platform',
                    'webtoon_start_date', 'webtoon_end_date', 'total_views',
                    'rating', 'release_date', 'watch_time', 'imdb_rating',
                    'webtoon_highlight', 'ott_highlight', 'diff_ott_webtoon', 'compare_youtube_url'
                ]
            });


            // ipDetailInfo 데이터가 존재하면 결과에 추가
            if (ipDetailInfo) {
                const {
                    title,
                    webtoon_title,
                    webtoon_platform,
                    webtoon_start_date,
                    webtoon_end_date,
                    total_views,
                    rating,
                    release_date,
                    watch_time,
                    imdb_rating,
                    webtoon_highlight,
                    ott_highlight,
                    diff_ott_webtoon,
                    compare_youtube_url
                } = ipDetailInfo.dataValues;
                return {
                    post_id: post.dataValues.post_id,
                    ip_id: post.dataValues.ip_id,
                    com_Id: post.dataValues.com_Id,
                    virtual_casting_id: post.dataValues.virtual_casting_id,
                    type: post.dataValues.type,
                    title,
                    webtoon_title,
                    webtoon_platform,
                    webtoon_start_date,
                    webtoon_end_date,
                    total_views,
                    rating,
                    release_date,
                    watch_time,
                    imdb_rating,
                    webtoon_highlight: webtoon_highlight ? webtoon_highlight.split(',') : [],
                    ott_highlight: ott_highlight ? ott_highlight.split(',') : [],
                    diff_ott_webtoon: diff_ott_webtoon ? diff_ott_webtoon.split('.') : [],
                    compare_youtube_url
                };
            }

            // ip 정보가 없는 경우 기본 포스트 정보만 반환
            return {
                post_id: post.dataValues.post_id,
                ip_id: post.dataValues.ip_id,
                com_Id: post.dataValues.com_Id,
                virtual_casting_id: post.dataValues.virtual_casting_id,
                type: post.dataValues.type
            };
        }));

        console.log(postWithIpDetails);
        res.json(postWithIpDetails)

    } catch (err) {
        console.log(err)
    }
}

exports.getVirtualCastingPost = async (req, res) => {
    try {
        // Post 데이터 가져오기 (type이 v-casting인 경우)
        const postList = await Post.findAll({
            where: {type: "v_casting"}
        });

        // 각 post에 대한 VirtualCasting 정보 추가
        const postWithCastingDetails = await Promise.all(postList.map(async (post) => {
            // VirtualCasting 정보 가져오기
            const virtualCastingInfoDetail = await VirtualCasting.findOne({
                where: {virtual_casting_id: post.dataValues.virtual_casting_id}  // virtual_casting_id로 검색
            });

            // VirtualCasting 정보가 있는 경우
            if (virtualCastingInfoDetail) {
                const {
                    virtual_casting_title,
                    virtual_casting_image_url,
                    char_main,
                    char_main_url,
                    char_sub1,
                    char_sub1_url,
                    char_sub2,
                    char_sub2_url,
                    char_sub3,
                    char_sub3_url,
                    actor_main_casting1,
                    actor_main_casting1_recommend,
                    actor_main_casting1_url,
                    actor_main_casting2,
                    actor_main_casting2_recommend,
                    actor_main_casting2_url,
                    actor_sub1_casting1,
                    actor_sub1_casting1_recommend,
                    actor_sub1_casting1_url,
                    actor_sub1_casting2,
                    actor_sub1_casting2_recommend,
                    actor_sub1_casting2_url,
                    actor_sub2_casting1,
                    actor_sub2_casting1_recommend,
                    actor_sub2_casting1_url,
                    actor_sub2_casting2,
                    actor_sub2_casting2_recommend,
                    actor_sub2_casting2_url,
                    actor_sub3_casting1,
                    actor_sub3_casting1_recommend,
                    actor_sub3_casting1_url,
                    actor_sub3_casting2,
                    actor_sub3_casting2_recommend,
                    actor_sub3_casting2_url
                } = virtualCastingInfoDetail;

                return {
                    post_id: post.dataValues.post_id,
                    ip_id: post.dataValues.ip_id,
                    com_Id: post.dataValues.com_Id,
                    type: post.dataValues.type,
                    virtual_casting_title,
                    virtual_casting_image_url,
                    char_main,
                    char_main_url,
                    char_sub1,
                    char_sub1_url,
                    char_sub2,
                    char_sub2_url,
                    char_sub3,
                    char_sub3_url,
                    actor_main_casting1,
                    actor_main_casting1_recommend,
                    actor_main_casting1_url,
                    actor_main_casting2,
                    actor_main_casting2_recommend,
                    actor_main_casting2_url,
                    actor_sub1_casting1,
                    actor_sub1_casting1_recommend,
                    actor_sub1_casting1_url,
                    actor_sub1_casting2,
                    actor_sub1_casting2_recommend,
                    actor_sub1_casting2_url,
                    actor_sub2_casting1,
                    actor_sub2_casting1_recommend,
                    actor_sub2_casting1_url,
                    actor_sub2_casting2,
                    actor_sub2_casting2_recommend,
                    actor_sub2_casting2_url,
                    actor_sub3_casting1,
                    actor_sub3_casting1_recommend,
                    actor_sub3_casting1_url,
                    actor_sub3_casting2,
                    actor_sub3_casting2_recommend,
                    actor_sub3_casting2_url
                };
            }

            // VirtualCasting 정보가 없는 경우 기본 post 정보만 반환
            return {
                post_id: post.dataValues.post_id,
                ip_id: post.dataValues.ip_id,
                com_Id: post.dataValues.com_Id,
                virtual_casting_id: post.dataValues.virtual_casting_id,
                type: post.dataValues.type
            };
        }));

        // 결과 반환
        return res.json(postWithCastingDetails);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "서버 오류가 발생했습니다."});
    }
};

exports.getVirtualCastingPostDetail = async (req, res) => {
    try {
        const { id } = req.params;

        // Post에서 해당 id로 virtual_casting_id와 ip_id 가져오기
        const post = await Post.findOne({
            where: { post_id: id },
            attributes: ['virtual_casting_id', 'ip_id']
        });

        // 해당 post가 존재하지 않는 경우 처리
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const { ip_id, virtual_casting_id } = post.dataValues;

        // IP 상세 정보 가져오기
        const ipDetailInfo = await Ip.findOne({
            where: { ip_id },
            attributes: [
                'ip_id', 'title', 'webtoon_title', 'webtoon_platform',
                'webtoon_start_date', 'webtoon_end_date', 'rating', 'imdb_rating'
            ]
        });

        // IP 정보가 없는 경우 처리
        if (!ipDetailInfo) {
            return res.status(404).json({ error: 'IP details not found' });
        }

        // Virtual Casting 상세 정보 가져오기
        const virtualDetailInfo = await VirtualCasting.findOne({
            where: { virtual_casting_id }
        });

        // Virtual Casting 정보가 없는 경우 처리
        if (!virtualDetailInfo) {
            return res.status(404).json({ error: 'Virtual casting details not found' });
        }

        // 필요한 데이터만 추출하여 JSON으로 반환
        const result = {
            ...ipDetailInfo.dataValues,  // IP 정보를 그대로 추가
            ...virtualDetailInfo.dataValues // Virtual Casting 정보를 그대로 추가
        };

        res.json(result);
    } catch (err) {
        console.error("Error fetching compare post detail:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.putVirtualCastingPost = async (req, res) => {
    try {
        const {
            postId,
            actor_main_casting1_recommend,
            actor_main_casting2_recommend,
            actor_sub1_casting1_recommend,
            actor_sub1_casting2_recommend,
            actor_sub2_casting1_recommend,
            actor_sub2_casting2_recommend,
            actor_sub3_casting1_recommend,
            actor_sub3_casting2_recommend
        } = req.body;  // 업데이트할 데이터
        console.log("test check", actor_sub3_casting2_recommend)
        // 해당 postId에 대한 virtual_casting_id를 Post 테이블에서 가져오기
        const post = await Post.findOne({
            where: { post_id: postId },
            attributes: ['virtual_casting_id']
        });
        const virtual_casting_id = post.dataValues.virtual_casting_id
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // 해당 virtual_casting_id로 VirtualCasting 테이블에서 해당 캐스팅 정보를 업데이트
        const virtualCasting = await VirtualCasting.findOne({
            where: { virtual_casting_id: virtual_casting_id }
        });

        if (!virtualCasting) {
            return res.status(404).json({ message: 'Virtual casting not found' });
        }

        console.log("test",virtualCasting.dataValues)

        // 전달받은 데이터로 필드 업데이트
        await virtualCasting.update({
            actor_main_casting1_recommend: actor_main_casting1_recommend || virtualCasting.actor_main_casting1_recommend,
            actor_main_casting2_recommend: actor_main_casting2_recommend || virtualCasting.actor_main_casting2_recommend,
            actor_sub1_casting1_recommend: actor_sub1_casting1_recommend || virtualCasting.actor_sub1_casting1_recommend,
            actor_sub1_casting2_recommend: actor_sub1_casting2_recommend || virtualCasting.actor_sub1_casting2_recommend,
            actor_sub2_casting1_recommend: actor_sub2_casting1_recommend || virtualCasting.actor_sub2_casting1_recommend,
            actor_sub2_casting2_recommend: actor_sub2_casting2_recommend || virtualCasting.actor_sub2_casting2_recommend,
            actor_sub3_casting1_recommend: actor_sub3_casting1_recommend || virtualCasting.actor_sub3_casting1_recommend,
            actor_sub3_casting2_recommend: actor_sub3_casting2_recommend || virtualCasting.actor_sub3_casting2_recommend
        });

        return res.json({ message: 'Virtual casting post updated successfully' });
    } catch (err) {
        console.error('Error updating virtual casting post:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

