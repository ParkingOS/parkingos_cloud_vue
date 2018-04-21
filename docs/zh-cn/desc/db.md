# 表结构说明

## advert_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
aname | 名称 | character varying |  |  |
aurl | 链接地址 | character varying |  |  |
ctime | 添加时间 | bigint |  |  |
open | 打中次数 | integer | 0 |  |
hits | 打开链接次数 | integer | 0 |  |
appurl | 应用下载地址 | character varying |  |  |
tname | 礼券名称 | character varying |  |  |

## alipay_log

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint | '-1' |  |
uin |  | bigint |  |  |
notify_no |  | character varying |  |  |
create_time |  | bigint |  |  |
money |  | numeric |  |  |
wxp_orderid | 微信公众号订单号 | character varying |  |  |
orderid |  | bigint | '-1' |  |

## area_ibeacon_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ibcid |  | character varying |  |  |
comid |  | bigint |  |  |
reg_time |  | bigint |  |  |
state |  | bigint |  |  |
pass | 通道号 | bigint | 0 |  |
major |  | integer |  |  |
minor |  | integer |  |  |
lng |  | numeric |  |  |
lat |  | numeric |  |  |

## auth_role_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
auth_id |  | bigint |  |  |
role_id |  | bigint |  |  |
sub_auth | 子权限 | character varying |  |  |
creator_id | 创建者编号 | bigint |  |  |

## auth_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
nname | 节点名称 | character varying |  |  |
state |  | integer | 0 |  |
isparent | 是否是父节点 | boolean | false |  |
nid | 子节点ID | bigint |  |  |
pid | 父节点ID | bigint |  |  |
sub_auth | 子权限 | character varying |  |  |
url | 请求链接 | character varying |  |  |
oid | 所属组织类型 | bigint |  |  |
sort | 排序 | integer | 0 |  |
actions | 子权限的 action | character varying |  |  |
create_time | 创建时间 | bigint |  |  |
delete_time |  删除时间 | bigint |  |  |
update_time | 最后一次更新时间 | bigint |  |  |
creator_id |  创建者编号 | bigint |  |  |
deletor_id |  删除者编号 | bigint |  |  |
show | 是否在菜单列表显示 0：显示 1：不显示 | integer | 0 |  |

## berth_order_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
berth_id | 地磁名称（dici_tb的did） | character varying |  |  |
in_time | 来车时间 | bigint |  |  |
out_time | 走车时间 | bigint |  |  |
total | 金额 | numeric | 0 |  |
state | 0:未出场 1：已出场 | integer | 0 |  |
orderid | 订单表order_tb主键 | bigint | '-1' |  |
in_uid | 进场收费员 | bigint | '-1' |  |
out_uid | 出场收费员 | bigint | '-1' |  |
order_total | 实际订单收款金额 | numeric | 0 |  |
comid |  | bigint | '-1' |  |
indicate | 地磁进场标识，进场是时生成一下00-FF的标志，出场时传相同的标示 | character varying |  |  |
dici_id | 车位编号（com_park_tb编号id） | bigint |  |  |
bind_flag | 是否可以用来绑定POS机订单 0：不可以 1：可以 | integer | 0 |  |
berthseg_id | 泊位段编号 | bigint | '-1' |  |
groupid | 运营集团账号(索引) | bigint | '-1' |  |
is_delete |  状态 0：正常 1：删除 | integer | 0 |  |

## berth_order_tb_error

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
berth_id |  | character varying |  |  |
in_time |  | bigint |  |  |
out_time |  | bigint |  |  |
total |  | numeric | 0 |  |
state |  | integer | 0 |  |
orderid |  | bigint | '-1' |  |
in_uid |  | bigint | '-1' |  |
out_uid |  | bigint | '-1' |  |
order_total |  | numeric | 0 |  |
comid |  | bigint | '-1' |  |
indicate |  | character varying |  |  |
dici_id |  | bigint |  |  |
bind_flag |  | integer | 0 |  |
berthseg_id |  | bigint | '-1' |  |
groupid |  | bigint | '-1' |  |
is_delete |  | integer | 0 |  |

## bizcircle_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name |  | character varying |  |  |
resume |  | character varying |  |  |
state | 状态 | integer | 0 |  |
create_time |  | bigint |  |  |

## bolink_ccount_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint |  |  |
groupid | 集团编号 | bigint | '-1' |  |
money | 金额 | numeric |  |  |
giveto | 停车费记录到的账户 0停车场 1收费员 2集团 3泊链平台 | integer |  |  |
ctime | 记录时间 | bigint |  |  |
uin | 车主编号 | bigint |  |  |
type | 类型 0其它平台车主在本平台停车，车场账户收入停车费，泊链平台及本台的停车费， 1车主在其它平台支付停车费，泊链平台已扣本平台的余额，本平台扣除用户的余额 | integer | 0 |  |
orderid | 订单编号，type=0时是本平台的订单编号，为1时，第三方的订单编号 | character varying |  |  |

## bolink_order_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
union_id | 车主停车的厂商编号 | bigint |  |  |
money | 金额 | numeric |  |  |
start_time | 进场时间 | bigint |  |  |
end_time | 出场时间 | bigint |  |  |
state | 状态 0未结算 1已结算 | integer |  |  |
in_time | 进场记录时间 | bigint |  |  |
out_time | 出场记录时间 | bigint |  |  |
update_time | 订单金额修改时间 | bigint |  |  |
union_name | 厂商平台名称 | character varying |  |  |
park_name | 停车场名称 | character varying |  |  |
order_id | 车主停车所在厂商平台的订单编号 | character varying |  |  |
plate_number | 车牌号码 | character varying |  |  |
uin | 车主编号 | bigint |  |  |
pay_type | 0现金 1电子支付 | integer | 0 |  |
pay_union_id | 电子支付的厂商平台，现金支付时为-1 | bigint | '-1' |  |
prepay | 预付金额 | numeric | 0 |  |
park_id | 第三方车场编号 | character varying |  |  |
duration | 停车时长 | integer |  |  |
prepay_time |  | bigint |  |  |
trade_no | 交易流水号 | character varying |  |  |

## bolink_pay_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ctimedate |  | character varying |  |  |
ctime |  | bigint |  |  |
trade_no |  | character varying |  |  |
state | 0新建 1已完成 2未通知 3已补发 | integer |  |  |
callback | 回调数据 | character varying |  |  |
request_data | 请求数据 | character varying |  |  |
issend | 0 未发送 1已发送 | integer |  |  |
money |  | character varying |  |  |
car_number |  | character varying |  |  |
send_time | 发送时间，重发时间 | bigint |  |  |

## bonus_record_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
bid | 红包编号 1:今日头条(北京)，2:传单红包，3:节日红包，4:今日头条（外地） 998:直付红包，999:收费员推荐车主，1000:为订单红包 | bigint |  |  |
ctime | 领取时间 | bigint |  |  |
mobile | 领取人手机 | character varying |  |  |
state | 0：未写入车主账户，1：已写入用户账户 | integer | 0 |  |
amount | 金额 | integer |  |  |
type | 类型：0普通券，1打折券 | integer | 0 |  |

## bonus_type_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name |  | character varying |  |  |
ctime |  | bigint |  |  |
state | 状态 0不可用，1可用 | integer |  |  |

## card_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
card_id | 卡片编号 | bigint | '-1' |  |
type | （卡片的生命周期）0：充值 1：消费 2：开卡（卡片初始化，此时的卡片还不能使用） 3：激活卡片（此时卡片方可使用） 4：绑定用户 5：注销卡片 | integer | 0 |  |
charge_type | 充值方式：0：现金充值 1：微信公众号充值 2：微信客户端充值 3：支付宝充值 4：预支付退款 5：订单退款  | integer | '-1' |  |
consume_type | 消费方式 0：支付停车费（非预付） 1：预付停车费 2：补缴停车费  3：追缴停车费 | integer | '-1' |  |
amount | 金额 | numeric | 0 |  |
orderid | 订单编号 | bigint | '-1' |  |
create_time | 记录时间 | bigint |  |  |
remark | 说明 | character varying |  |  |
uin | 车主编号（有可能是非卡片持有者） | bigint | '-1' |  |
uid | 收费员（或者操作人）账号 | bigint | '-1' |  |
comid | 产生这笔流水所在的车场编号| bigint | '-1' |  |
berthseg_id | 产生这笔流水所在的泊位段编号 | bigint | '-1' |  |
berth_id | 产生这笔流水所在的泊位编号| bigint | '-1' |  |
groupid | 运营集团账号 | bigint | '-1' |  |
is_delete | 账目流水状态 0：正常 1：删除| integer | 0 |  |

## card_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time | 统计时间 | bigint |  | NOT NULL |
all_count | 截止当前时间发卡总数 | integer | 0 |  |
all_balance | 截止当前时间总余额 | numeric | 0 |  |
slot_charge | 一个统计时间段内的充值金额 | numeric | 0 |  |
slot_consume | 一个统计时间段内消费总额 | numeric | 0 |  |
slot_refund_count | 一个统计时间段内退卡总数 | integer | 0 |  |
slot_refund_balance | 一个统计时间段内办理退卡退还的余额总数 | numeric | 0 |  |
slot_act_count | 一个统计时间段内发卡数量（激活卡片） | integer | 0 |  |
slot_act_balance | 一个统计时间段内发行卡片（激活卡片）的初始化余额总数 | numeric | 0 |  |
groupid | 运营集团编号 | bigint | '-1' | NOT NULL |
slot_bind_count | 一个统计时间段内绑定的用户数量 | integer | 0 |  |

## card_carnumber_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
car_number |  | character varying |  | NOT NULL |
card_id |  | bigint | '-1' | NOT NULL |
is_delete | 0：正常 1：删除 | integer | 0 |  |
create_time |  | bigint |  | NOT NULL |

## card_renew_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id | 主键id | integer | nextval('seq_card_renew_tb'::regclass) | NOT NULL |
trade_no | 购买月卡流水号 | character varying |  |  |
card_id | 月卡编号 | character varying |  |  |
pay_time | 月卡续费时间 | integer |  |  |
amount_receivable | 应收金额 | character varying |  |  |
amount_pay | 实收金额 | character varying |  |  |
collector | 收费人 | character varying |  |  |
pay_type | 缴费类型 | character varying |  |  |
car_number | 车牌号 | character varying |  |  |
user_id | 用户编号 | character varying |  |  |
resume | 备注信息 | character varying |  |  |
buy_month | 购买月数 | integer |  |  |
comid | 车场编号 | character varying |  |  |
create_time | 月卡缴费记录入库时间 | integer |  |  |
update_time | 月卡续费修改时间 | integer |  |  |
limit_time |  | bigint |  |  |
start_time |  | bigint |  |  |

## car_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
car_number |  | character varying |  |  |
state | 0:不可用，1：可用 | integer | 1 |  |
create_time | 新建时间 | bigint |  |  |
is_auth |  是否已认证 -1认证失败 0未认证，1已认证 2认证中 | integer | 0 |  |
is_comuse | 是否是常用车牌，0不是，1是 | integer | 0 |  |
pic_url1 | 图片地地址1 | character varying |  |  |
pic_url2 | 图片地地址2 | character varying |  |  |
remark | 说明 | character varying |  |  |

## car_number_type_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint | '-1' |  |
car_number | 车牌号 | character varying |  |  |
typeid | 车型管理 | bigint | '-1' |  |
update_time |  | bigint |  |  |

## carower_product

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
pid |  | bigint |  |  |
uin |  | bigint |  |  |
create_time |  | bigint |  |  |
b_time |  | bigint |  |  |
e_time |  | bigint |  |  |
total | 金额 | numeric | 0 |  |
remark | 备注 | character varying |  |  |
name | 会员名字 | character varying |  |  |
address | 会员地址 | character varying |  |  |
p_lot | 车位编号 | character varying |  |  |
act_total | 实际收取的金额（有优惠） | numeric | 0 |  |
etc_id | 电子标签 | character varying |  |  |
update_time | 记录数据修改时间 | bigint |  |  |
card_id | 月卡编号（收费系统唯一编号） | character varying |  |  |
member_id | 车主在收费系统编号 | character varying |  |  |
car_number | 车牌，多个车牌，用”,”英文分隔 | character varying |  |  |
com_id | 车场编号 | bigint |  |  |
mobile | 手机号 | character varying |  |  |
is_delete | 记录云端月卡会员是否被删除 | bigint | 0 |  |
car_type_id | 车辆类型，关联car_type_tb 主键 | bigint |  |  |
limit_day_type | 单双日限行 0 不限制，1限制 | integer | 0 |  |
price_info | 临时月卡价格信息 | character varying |  |  |

## carpic_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id | 主键id | integer | nextval('seq_carpic_tb'::regclass) | NOT NULL |
order_id | 订单编号 | character varying |  |  |
create_time | 图片上传时间 | integer |  |  |
car_number | 图片对应的车牌号 | character varying |  |  |
pic_type | 图片上传类型 | character varying |  |  |
resume | 车辆图片上传备注 | character varying |  |  |
comid | 车场编号 | character varying |  |  |
update_time | 车辆图片修改时间 | integer |  |  |
content | 存储图片base64编码 | text |  |  |
picture_source | 车场上传图片来源 | character varying |  |  |
liftrod_id | 车场收费系统抬杆记录编号 | character varying |  |  |
park_order_type | 车场订单图片对应的类型 | character varying |  |  |
carpic_table_name | 记录车辆出入场图片在云端存储的表名 | character varying |  |  |
liftpic_table_name | 记录云端存储的抬杆图片表名位置 | character varying |  |  |
event_id | 手动匹配订单事件编号 | character varying |  |  |
confirmpic_table_name | 记录云端存储的人工确认订单车牌图片表名位置 | character varying |  |  |

## car_picturs_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
orderid |  | bigint |  |  |
create_time |  | bigint |  |  |
lefttop |  | character varying |  |  |
rightbottom |  | character varying |  |  |
pictype |  | integer |  |  |
width | 图片宽 | character varying |  |  |
height | 图片高 | character varying |  |  |

## carstop_order_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
cid | 泊车点编号 | bigint |  |  |
uin | 车主 | bigint |  |  |
car_number | 车牌 | character varying |  |  |
buid | 接车人 | bigint |  |  |
euid | 还车人 | bigint |  |  |
start_time | 车主下单时间 | bigint |  |  |
btime | 接车时间 | bigint |  |  |
end_time | 请求还车时间 | bigint |  |  |
etime | 还车时间 | bigint |  |  |
amount | 金额 | numeric |  |  |
state | 状态:0车主泊车请求 1泊车员已响应泊车 2正在泊车  3泊车完成 4车主取车请求 5 泊车员已响应取车 6泊车员正在取车 7等待支付 8支付成功 9订单取消 | integer |  |  |
pic | 泊车照片 | character varying |  |  |
lng | 车主、车辆经度 | numeric |  |  |
lat | 车主/车辆纬度 | numeric |  |  |
keyno | 车钥匙编号 | character varying |  |  |
car_local | 泊车位置 | character varying |  |  |
pay_type | 支付方式   0现金，1余额, 2微信，3余额+微信 | integer |  |  |
oilpic | 油表照片 | character varying |  |  |

## carstops_price_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
cid | 泊车点编号 | bigint |  |  |
ctime |  | bigint |  |  |
utime |  | bigint |  |  |
first_price |  | numeric |  |  |
first_unit | 首价格时长（分钟） | integer |  |  |
next_price | 下一计价价格 | numeric |  |  |
next_unit | 下一计价单位分钟 | integer |  |  |
top_price | 封顶价格 | numeric |  |  |
fav_price | 优惠价 | numeric |  |  |
fav_unit | 优惠价格单位（分钟） | integer |  |  |
type | 类型  0临停  1常停 | integer |  |  |
creator | 创建人 | character varying |  |  |
resume | 说明 | character varying |  |  |

## car_stops_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 名称 | character |  |  |
longitude |  | numeric |  |  |
latitude |  | numeric |  |  |
start_price | 起步价 | numeric |  |  |
next_price |  | numeric |  |  |
max_price | 最高价 | numeric |  |  |
state | 状态，0正常，1不可用 | integer | 0 |  |
ctime | 创建日期 | bigint |  |  |
utime | 修改日期 | bigint |  |  |
cuin | 创建人 | bigint |  |  |
resume | 说明 | character |  |  |
pic | 泊车点图片 | character varying |  |  |
address |  位置 | character varying |  |  |
creator | 创建人 | character varying |  |  |
city | 所在城市 | integer | '-1' |  |

## car_type_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name |  | character varying |  |  |
comid | 所属车场 | bigint |  |  |
sort | 排序 | integer | 0 |  |
cartype_id | 第三方车型编号 | character varying |  |  |
create_time | 新建时间 | bigint |  |  |
update_time | 更新时间 | bigint |  |  |
is_delete |  是否删除 0否1是 | integer | 0 |  |

## city_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
cityid | 城市商户编号 | bigint | '-1' |  |
amount | 金额 | numeric | 0 |  |
create_time | 记录时间 | bigint |  |  |
type | 类型 0：充值 1：支出 | integer |  |  |
source | 来源 0：停车费（非预付），1：提现，2：追缴停车费，3：预付停车费，4：预付退款（预付），5：预付补缴（预付金额不足） | integer |  |  |
remark | 备注 | character varying |  |  |
withdraw_id | 提现记录编号 | bigint | '-1' |  |
orderid | 订单编号 | bigint | '-1' |  |
uid | 收费员账号 | bigint | '-1' |  |
comid | 车场编号 | bigint | '-1' |  |
berthseg_id | 产生这笔流水所在的泊位段编号 | bigint | '-1' |  |
berth_id | 产生这笔流水所在的泊位编号 | bigint | '-1' |  |
groupid | 运营集团账号 | bigint | '-1' |  |
is_delete | 账目流水状态 0：正常 1：删除 | integer | 0 |  |

## city_hotarea_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id || bigint |  | NOT NULL |
name | 名称 | character varying |  |  |
adress | 详细地址 | character varying |  |  |
reason | 说明 | character varying |  |  |
create_time | 新建日期 | bigint |  |  |
create_user | 创建人 | bigint |  |  |
update_time | 修改时间 | bigint |  |  |
update_user | 修改人 | bigint |  |  |
delete_time | 删除时间 | bigint |  |  |
delete_user | 删除人 | bigint |  |  |
state | 状态 0正常 1 删除 | integer | 0 |  |
cityid | 城市商户号 | bigint | '-1' |  |

## city_peakalert_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
title | 标题 | character varying |  |  |
content | 内容 | character varying |  |  |
handle_user | 处理人 | bigint |  |  |
create_time | 添加时间 | bigint |  |  |
handle_time | 处理时间 | bigint |  |  |
state | 0新建 1已处理  | integer |  |  |
cityid | 城市编号 | bigint |  |  |
comid |  | bigint | '-1' |  |
hotarea_id |  | bigint | '-1' |  |

## city_video_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
video_name |  | character varying |  |  |
ip |  | character varying |  |  |
port |  | character varying |  |  |
cusername |  | character varying |  |  |
cpassword |  | character varying |  |  |
manufacture |  | character varying |  |  |
state | 0：故障 1：正常 2：删除 | integer | 1 |  |
cityid |  | bigint | '-1' |  |
latitude | 纬度 | character varying |  |  |
longitude | 经度 | character varying |  |  |
comid |  | bigint | '-1' |  |
type | 监控类型 0：路侧监控 1:封闭停车场监控 | integer |  |  |
channelid | 摄像头通道 | character varying |  |  |
deviceid | 设备编号 | character varying |  |  |
address | 地址 | character varying |  |  |
create_time |  | bigint |  |  |
update_time |  | bigint |  |  |

## collect_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint | '-1' |  |
cash | 现金 | numeric | 0 |  |
epay_collector | 收费员收取的电子金额 | numeric | 0 |  |
epay_park | 车场收取的电子金额 | numeric | 0 |  |
epay_group | 运营集团收取的电子金额 | numeric | 0 |  |
epay_city | 城市商户收取的电子金额 | numeric | 0 |  |
create_time |  | bigint |  |  |

## collector_account_pic_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
pic_name | 图片名称 | character varying |  |  |
ctime |  | bigint |  |  |
utime |  | bigint |  |  |
state | 0:待审核 1:已审核，2:审核中，3:无效 | integer |  |  |
comid | 停车场 | bigint |  |  |
auditor | 审核人 | bigint |  |  |

## collector_scroe_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
lala_scroe |  | numeric | 0 |  |
nfc_score |  | numeric | 0 |  |
praise_scroe |  | integer | 0 |  |
create_time |  | bigint |  |  |
pai_score | 照牌积分 | numeric | 0 |  |
online_scroe | 在线积分，每10分钟积0.2分 | numeric | 0 |  |
recom_scroe | -- 推荐积分 | integer | 0 |  |

## collector_set_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
role_id | 所属角色 | bigint | '-1' |  |
photoset | 拍照设置【num1,num2,num3】分别是入场可拍照片数，出场可拍照片数，未缴可拍照片数 | character varying |  |  |
change_prepay | 是否可更改预收金额 0不可，1可以 | integer | 0 |  |
view_plot | 0列表，1显示泊位 | integer | 0 |  |
print_sign | 打印小票信息【入场，出场】 | character varying |  |  |
prepayset | 预收设置 【num1,num2,num3...】预收金额选项 | character varying |  |  |
isprepay | 0不可预收 1可预收 | integer | 0 |  |
hidedetail | 1隐藏 0不隐藏首页收费汇总 | integer | 0 |  |
is_sensortime | 0：取车检器时间作为录入订单时间 1：取当前时间作为录入订单时间 | integer | 0 |  |
password | 查看汇总的权限密码 | character varying |  |  |
signout_password | 签退密码 | character varying |  |  |
signout_valid | 客户端签退是否需要密码验证 0：不需要 1：需要 | integer | 0 |  |
is_show_card | 是否在收费汇总和打印小票处显示出来卡片的数据（有些运营集团没有卡片） 0：显示 1：不显示 | integer | 0 |  |
print_order_place2 | 桂林提出要在点击结算订单的时候就打印小票（已经有一个打印订单小票的地方，此处为第二个地方）0：不打印 1：打印 | integer | 0 |  |
is_duplicate_order | 同一车辆在同一运营集团不同车场能否同时存在在场订单 1：是 0：否 | smallint | 1 |  |
is_print_name | 控制打印小票要不要显示收费员名字（有的车场矫情，不让显示名字）1：打印 0：不打印 | smallint | 1 |  |

## collector_sort

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
create_time |  | bigint |  |  |
park_count |  | integer |  |  |

## com_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint | '-1' |  |
uin |  | bigint |  |  |
card_number | 银行卡帐号或支付宝、微信等帐号 | character varying |  |  |
atype | 0银行卡，1支付宝，2微信 | integer |  |  |
name | 绑定人姓名 | character varying |  |  |
mobile | 绑定人手机号 | character varying |  |  |
bank_name | 开户行 | character varying |  |  |
note | 备注 | character varying |  |  |
type |  0:公司，1个人 2对公 | integer | 0 |  |
state | 0:可用，1禁用 | integer | 0 |  |
area | 开户地区 | character varying |  |  |
bank_pint | 开户支行（营业网点) | character varying |  |  |
user_id | 身份证号 | character varying |  |  |
city | 收款人所在市 | character varying |  |  |
pay_type | 结算方式 | character varying |  |  |
pay_date | 期望日 | character varying |  |  |
use | 用途 | character varying |  |  |
bank_no | 收方行号 | character varying |  |  |
groupid | 运营集团编号 | bigint | '-1' |  |
cityid |  城市商户编号 | bigint | '-1' |  |

## com_alert_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time | 新建日期 | bigint |  |  |
source | 来源 | character varying |  |  |
content | 内容 | character varying |  |  |
type | 类型  | integer |  |  |
state | 状态 0新建 1已审核 2已发布 3取消 | integer |  |  |
handle_user | 处理人 | bigint |  |  |
handle_time | 处理时间| bigint |  |  |
cityid | 所属城市 | bigint |  |  |

## com_berthsecs_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uuid | 唯一标识 | character varying |  |  |
berthsec_name | 泊位段名称 | character varying |  |  |
park_uuid | 所属停车场uuid | character varying |  |  |
create_time | 创建日期 | bigint |  |  |
address | 详细地址 | character varying |  |  |
longitude | 经度 | numeric |  |  |
latitude | 纬度 | numeric |  |  |
is_active | 状态 0：正常 1：禁用 | integer | 0 |  |
comid | 车场编号 | bigint | '-1' |  |

## com_brake_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
brake_name | 道闸名称 | character varying |  |  |
serial | 串口号 | character varying |  |  |
ip | 设备地址 | character varying |  |  |
passid | 通道id | bigint |  | NOT NULL |
state |  | integer | '-1' |  |
upload_time |  | bigint |  |  |
comid |  所属车场 | bigint | '-1' |  |

## com_camera_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
camera_name | 摄像头名称 | character varying |  |  |
ip | 摄像头IP地址 | character varying |  |  |
port | 摄像头端口 | character varying |  |  |
cusername | 摄像头用户名 | character varying |  |  |
cpassword | 摄像头用户密码 | character varying |  |  |
manufacturer | 制造厂商 | character varying |  |  |
passid |  | bigint |  | NOT NULL |
state | -1和1表示正常 0表示故障 | integer | '-1' |  |
upload_time |  | bigint |  |  |
comid |  | bigint | '-1' |  |

## com_comment_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
comid |  | bigint |  |  |
comment |  | character varying |  |  |
create_time |  | bigint |  |  |

## com_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
company_name |  | character varying |  |  |
phone |  | character varying |  |  |
fax |  | character varying |  |  |
address |  | character varying |  |  |
zipcode |  | character varying |  |  |
homepage |  | character varying |  |  |
resume |  | character varying |  |  |
create_time |  | bigint |  |  |
longitude |  | numeric |  |  |
latitude |  | numeric |  |  |
parking_type | -- 车位类型，0地面，1地下，2占道 3室外 4室内 5室内外 | integer | 0 |  |
parking_total |  | integer | 0 |  |
share_number |  | integer | 0 |  |
auto_order |  | integer |  |  |
mobile |  | character varying |  |  |
total_money |  | numeric | 0 |  |
money |  | numeric | 0 |  |
property |  | character varying |  |  |
type | 停车场类型，0：付费，1免费 | integer | 0 |  |
stop_type | 0：平面排列，1：立体排列 | integer | 0 |  |
update_time |  | bigint |  |  |
state | 0:可用，1：删除,2:待审核 | integer | 2 |  |
biz_id | 商圈 | bigint |  |  |
uid | 市场专员---引用用户表 | bigint |  |  |
city | 所在城市 | integer | 110000 |  |
recom_code | 推荐码：车场停车员的帐号 | bigint |  |  |
nfc |  | integer | 0 |  |
etc | 0:不支持，1:Ibeacon 2:通道照牌 3:手机照牌 4:Pos机照牌 | integer | 0 |  |
book |  | integer | 0 |  |
navi |  | integer | 0 |  |
monthlypay |  | integer | 0 |  |
isnight | 夜晚停车，0:支持，1不支持 | integer | 0 |  |
isfixed | 0：未校验，1：已校验，2：申请校验，-1：一次未通过，-2：二次未通过，-3：三次未通过 | integer | 0 |  |
iscancel | 是否在结算订单时去掉取消按钮,0:否，1是 | integer | 1 |  |
firstprovince | 优先识别省份 | character varying |  |  |
mcompany | 经营公司 | character varying |  |  |
record_number |  备案号 | character varying |  |  |
epay | 电子支付，0不支持，1支持 | integer | 0 |  |
is_hasparker | 0,没有收费员在位，1有收费员在位 | integer | 0 |  |
isview | 是否在地图上显示 0不显示，1显示 | integer | 1 |  |
remarks | 备注 | character varying |  |  |
invalid_order | 未结算的垃圾订单数量 | bigint | 0 |  |
fixed_pass_time | 车场校验通过的时间 | bigint |  |  |
car_type | 是否区分大小车，0:不区分，1：区分 | integer | 0 |  |
passfree | 是否允许免费结算订单，0：允许，1：不允许 | integer | 0 |  |
activity | 车场活动：0 没有活动 1申请活动 2:申请通过 | integer | 0 |  |
activity_content | -- 活动内容 | character varying |  |  |
upload_uin | 上传人 | bigint | '-1' |  |
minprice_unit | 0（该收多少收多少）,0.5（收5毛 ）,1（收一块） | numeric | 0 |  |
isshowepay | 是否显示直付订单，1显示，0不显示 | integer | 1 |  |
ishidehdbutton | -- 结算按钮（HD版）0显示  1不显示   默认0
 | integer | 0 |  |
isautopay | 车场是否支持自动支付   0:不支持，1:支持 | integer | 1 |  |
allowance | 车场补贴额 | numeric |  |  |
order_per |  比例 | integer | 0 |  |
entry_set |  | integer | 0 |  |
entry_month2_set |  | integer | 0 |  |
chanid | 渠道编号 | bigint | '-1' |  |
groupid | 集团编号 | bigint | '-1' |  |
ishdmoney |  是否隐藏收费金额  0不隐藏，1隐藏 | integer | 0 |  |
pid | 所属车场 | bigint | '-1' |  |
full_set |  车位满进场设置  0可进  1禁止
  | integer | 0 |  |
leave_set | 离场设置    0默认设置   1识别就抬杆 | integer | 0 |  |
areaid |  区域编号 | bigint | '-1' |  |
cityid |  城市编号 | bigint | '-1' |  |
hotarea_id |  热点区域编号 | bigint | '-1' |  |
empty | 空闲车位数 | integer | 0 |  |
upload_union_time | 上传时间 | bigint |  |  |
union_state | 0 未上传 1已上传在使用 2已上传未审核 3已上传并禁用 | integer | 0 |  |
ukey | 描述车场的秘钥 | character varying |  |  |
superimposed | 这个车场的商户是不是支持叠加用减免券,默认不支持 | integer | 0 |  |
bolink_id | 泊链编号,先注册泊链,再注册云平台 | character varying |  |  |
beat_time |  | bigint |  |  |

## com_led_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ledip | ip地址 | character varying |  |  |
ledport | 端口号 | character varying |  |  |
leduid | 素材UID | character varying |  |  |
movemode | 移动方式:0：自适应，1：从右向左移动，2：从左向右移动，3：从下向上移动，4：从上向下移动，5：从右向左展开，6：从左向右展开，7：从下向上展开，8：从上向下展开，9：立即显示，10：从中间向两边展开，11：从两边向中间展开，12：从中间向上下展开，13：从上下向中间展开，14：闪烁，15：右百叶 | integer |  |  |
movespeed | 移动速度 | integer |  |  |
dwelltime | 停留时间：0：0s，1：1s，2：2s，3：3s，4：4s，5：5s | bigint |  |  |
ledcolor | 显示屏颜色：0：单基色，1：双基色 | integer |  |  |
showcolor | 颜色：0：红，1：绿，2：黄 | integer |  |  |
typeface | 字体：1：宋体，2：楷体，3：黑体，4：隶书，5：行书 | integer |  |  |
typesize | 字号：0：12×12，1：16×16，2：24×24，3：32×32，4：48×48，5：64×64，6：80×80，7：96×96 | integer |  |  |
matercont | 素材内容 | character varying |  |  |
passid | 通道ID | bigint |  |  |
width | led宽 | integer | 128 |  |
height | led高 | integer | 32 |  |
type | 0  默认   1 余位屏 | integer | 0 |  |
rsport |  integer DEFAULT 1, -- 转发端口  1默认: rs232-1  2:rs232-2   3:rs485 | integer | 1 |  |
state |  | integer | '-1' |  |
upload_time |  | bigint |  |  |
comid |  | bigint | '-1' |  |

## com_nfc_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
nfc_uuid |  | character varying |  |  |
comid |  | bigint |  |  |
create_time |  | bigint |  |  |
state | (之前该字段表示NFC卡状态：0正常，1禁用） 0：激活（对应之前的正常） 1：注销（对应之前的禁用）  2：绑定用户(手机号) 3：开卡（此时的卡片还不能用，要激活后才可使用） 4：绑定车牌号（无手机号） | bigint | 0 |  |
use_times |  | integer |  |  |
uin | -- 车主帐号 | bigint | '-1' |  |
uid | 收费员编号 | bigint | '-1' |  |
update_time | 更新时间,绑定用户时间 | bigint | 0 |  |
nid | 扫描NFC的二维码号 | bigint | 0 |  |
qrcode | 二维码 | character varying |  |  |
type | 设备类型 0：NFC  1：电子标签 2：商家卡（商家自己发行的IC卡） | integer | 0 |  |
card_name | 卡片名称 | character varying |  |  |
device | 开卡设备 | character varying |  |  |
is_delete | 0：正常 1：已删除 | integer | 0 |  |
balance | 卡片余额 | numeric | 0 |  |
card_number | 卡面号（印在卡面上的编号） | character varying |  |  |
tenant_id | 城市商户编号 | bigint | '-1' |  |
group_id | 运营集团编号 | bigint | '-1' |  |
reg_id | 开卡(入库)人编号
   | bigint | '-1' |  |
cancel_id | 注销人（解绑）编号 | bigint | '-1' |  |
cancel_time | 注销时间 | bigint |  |  |
activate_id | 激活卡片人编号 | bigint | '-1' |  |
activate_time | 激活时间 | bigint |  |  |

## com_parkstatus_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint |  |  |
total | 车位总数 | integer |  |  |
empty | 总空闲车位数 | integer |  |  |
sheduled | 总可预定车位数(如无可预定车位用0表示) | integer |  |  |
rscheduled | 空可预定车位(如无空可预定车位用0表示) | integer |  |  |
internal | 内部总车位数量(如车位不分内外车位填0) | integer |  |  |
rinternal | 内部空车位数量(如车位不分内外车位填0) | integer |  |  |
ctime | 时间戳 | bigint |  |  |
chanid | 合作方号 | bigint |  |  |
cityid | 城市商户号 | bigint |  |  |

## com_park_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
cid | 车位编号 | character varying |  |  |
state | 0空闲 1占用 | integer | 0 |  |
qid | 二维码编号 | bigint |  |  |
order_id | 订单编号 | bigint |  |  |
dici_id | 地磁编号 | integer |  |  |
enter_time | 入场时间 | bigint |  |  |
end_time | 出场时间 | bigint |  |  |
address | 地址 | character varying |  |  |
berthsec_id | 泊位段编号 | bigint | '-1' |  |
create_time | 创建时间 | bigint |  |  |
uuid | 唯一编号 | character |  |  |
longitude | 经度 | numeric |  |  |
latitude | 纬度 | numeric |  |  |
is_delete | 0正常，1已删除 | integer | 0 |  |

## com_pass_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
worksite_id | 工作站ID | bigint |  | NOT NULL |
passname | 通道名称 | character varying |  |  |
passtype | 通道类型 0入口，1出口，2出入 | character varying |  |  |
description | 通道说明 | character varying |  |  |
comid |  | bigint |  |  |
state | 状态 0：正常 1：禁用 | integer | 0 |  |
month_set | 非月卡车设置   0不限制  1非月卡车禁止进入
  | integer | '-1' |  |
month2_set | 月卡第二..辆车设置   0不限制  1月卡第二辆车禁止进 | integer | '-1' |  |
channel_id | 第三方通道编号 | character varying |  |  |

## com_picturs_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
picurl |  | character varying |  |  |
create_time |  | bigint |  |  |

## com_pos_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
pda | 设备编号 | character varying |  |  |
state | 使用状态 0正常1不可用 | integer |  |  |
uid | 收费员 | bigint |  |  |
is_deleted | 是否删除 | integer |  |  |
delete_user | 删除人 | bigint |  |  |
delete_time | 删除时间 | bigint |  |  |
update_time | 修改时间
 | bigint |  |  |
update_user | 修改人 | bigint |  |  |
create_time | 创建日期
 | bigint |  |  |
create_user | 创建人 | bigint |  |  |
groupid | 运营集团 | bigint |  |  |

## com_praise_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
uin |  | bigint |  |  |
praise | 0:贬，1：赞 | integer |  |  |
create_time |  | bigint |  |  |

## com_temp_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
next_time |  | bigint |  |  |

## com_worksite_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  | NOT NULL |
worksite_name | 工作站名称 | character varying |  |  |
description |  | character varying |  |  |
net_type | 工作站网络环境，0：流量，1：宽带 | integer | 0 |  |
host_name |  | character varying |  |  |
host_memory |  | character varying |  |  |
host_internal |  | character varying |  |  |
upload_time |  | bigint |  |  |
state | 状态 0：正常 1：禁用 | integer | 0 |  |

## confirm_order_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | integer |  | NOT NULL |
event_id | 事件编号(在收费系统事件编号唯一，不可重复) | character varying |  |  |
car_number | 车牌号码 | character varying |  |  |
upload_time |  | bigint |  |  |
channel_id | 通道编号 | character varying |  |  |
state | 状态 0-待处理 1-已处理 | integer | 0 |  |
comid | 车场编号 | character varying |  |  |
groupid |  | character varying |  |  |

## consume_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
wx_total | 微信交易用户新增数 | bigint |  |  |
zfb_total | 支付宝交易用户新增数量 | bigint |  |  |
wxp_total | 微信公众号交易用户新增数量 | bigint |  |  |

## dataauth_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
authorizee | 被授权人id | bigint |  |  |
authorizer | 授权人id | bigint |  |  |
department_id | 部门id | bigint |  |  |

## department_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
nid | 节点ID | bigint |  |  |
pid | 父节点 | bigint |  |  |
dname | 节点名称 | character varying |  |  |
state |  | integer | 0 |  |
isparent | 是否是父节点 | boolean | false |  |

## device_fault_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
sensor_id | 车检器编号 | bigint | '-1' |  |
site_id | 基站编号 | bigint | '-1' |  |
induce_id | 诱导屏编号 | bigint | '-1' |  |
create_time | 掉线时间  | bigint |  |  |
end_time | 恢复时间 | bigint |  |  |

## dici_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
code |  | character varying |  |  |
comid |  | integer |  |  |
state | 0空闲 1占用 | integer | 0 |  |
serid | 地磁主机ID | character varying |  |  |
did | 车检器唯一编号 | character varying |  |  |
operate_time |  操作时间 | bigint |  |  |
battery | 电池电压 | numeric |  |  |
magnetism | 电容电压 | numeric |  |  |
beart_time | 心跳时间 | bigint |  |  |
site_id | 车检器所属的基站编号 | bigint | '-1' |  |
is_delete | 状态 0：正常 1：删除 | integer | 0 |  |

## dictionary_detail_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id | 主键ID | bigint | nextval('seq_dictionary_detail_tb'::regclass) | NOT NULL |
item_id | 车场定义字典类型ID | integer |  |  |
subitemdesc | 车场定义子项目详细说明 | character varying |  |  |
sub_item_id | 数据编号 | integer |  |  |

## dictionary_item_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id | 主键id | bigint | nextval('seq_dictionary_item_tb'::regclass) | NOT NULL |
park_id |  | integer |  |  |
itemdesc | 车场定义的字典类别说明 | character varying |  |  |
item_name | 名称 | character varying |  |  |

## directpay_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
total |  | bigint |  |  |

## esc_record

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  |  |
create_time |  | bigint |  |  |
end_time |  | bigint |  |  |
order_id |  | bigint |  |  |
car_number |  | character varying |  |  |
state |  | integer |  |  |
uin |  | bigint |  |  |
comid |  | bigint |  |  |
total |  | numeric |  |  |
uid |  | bigint |  |  |
pursue_time |  | bigint |  |  |
act_total |  | numeric |  |  |
pursue_uid |  | bigint |  |  |
prepaid |  | numeric |  |  |
overdue |  | numeric |  |  |
berthsec_id |  | bigint |  |  |
cid |  | character varying |  |  |
nickname |  | character varying |  |  |
groupid |  | bigint |  |  |

## fix_code_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
code_src | 二维码连接 | character varying |  |  |
code | code值 | character varying |  |  |
time_limit | 剩余时间 | integer | 0 |  |
money_limit | 剩余金额 | integer | 0 |  |
free_limit | 剩余减免券张数 | integer | 0 |  |
state | 状态0可用 1 不可用 | integer | 0 |  |
shop_id |  | bigint |  |  |
id |  | bigint |  | NOT NULL |
type | 固定码类型 1减免券 2全免券 | integer | 1 |  |
amount | 单张额度 | integer |  |  |
create_time | 固定码名称 | bigint |  |  |
end_time |  | bigint |  |  |
validite_time | 有效期  小时 | integer | 24 |  |
name |  | character varying |  |  |

## flygame_pool_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ptype | 奖券类型：0停车宝停车券 1车主停车券 2余额券 3广告券 4清空福袋 5翻倍福袋  | integer |  |  |
money | 金额 | numeric |  |  |
tid | 车主停车券编号 | bigint |  |  |
aid | advert_tb 广告表编号 | bigint |  |  |
count | 数量 | integer |  |  |
ctime |  | bigint |  |  |

## flygame_score_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
ctime |  | bigint |  |  |
db_bullet_count | 双倍弹数量 | integer |  |  |
db_bullet_score | 双倍弹积分 | numeric |  |  |
empty_bullet_count | 清空弹数量 | integer |  |  |
empty_bullet_score | 清空弹积分 | numeric |  |  |
gift_count | 礼品券数量 | integer |  |  |
gift_score | 礼品券积分 | numeric |  |  |
balance_count | 余额券数量 | integer |  |  |
balance_score | 余额券积分 | numeric |  |  |
ticket_count | 停车券数量 | integer |  |  |
ticket_score | 停车券积分 | numeric |  |  |
second_count | 第二关入场券数量 | integer |  |  |
second_score | 第二关入场券积分 | numeric |  |  |
tid | 停车券编号 | bigint | '-1' |  |
cloud_count | 打掉云数量 | integer | 0 |  |
cloud_score | 云积分 | numeric | 0 |  |
crow_count |  打掉乌鸦数量 | integer | 0 |  |
crow_score | 乌鸦积分 | numeric | 0 |  |
bets_double_count | 子弹翻倍福袋数量 | integer | 0 |  |
bets_double_score | 子弹翻倍福袋积分 | numeric | 0 |  |
bets_halve_count | 子弹减半道具数量 | integer | 0 |  |
bets_halve_score | 子弹减半道具积分 | numeric | 0 |  |
score_double_count | 积分翻倍福袋数量 | integer | 0 |  |
score_double_score | 积分翻倍福袋积分 | numeric | 0 |  |
score_halve_count | 积分减半道具数量 | integer | 0 |  |
score_halve_score | 积分减半道具积分 | numeric | 0 |  |
catapult_full_count | 弹弓满血福袋数量 | integer | 0 |  |
catapult_full_score | 弹弓满血福袋积分 | numeric | 0 |  |
catapult_halve_count | 弹弓血量减半道具数量 | integer | 0 |  |
catapult_halve_score | 弹弓血量减半道具积分 | numeric | 0 |  |
float_score | 浮动积分，记录翻倍或减半 | numeric | 0 |  |

## flygame_score_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
fgid | flygame_pool_tb  游戏券池编号 | bigint |  |  |
remark | 说明 | character varying |  |  |
ctime | 时间 | bigint |  |  |
ptype | 奖券类型：0停车宝停车券 1车主停车券 2余额券 3广告券 4清空福袋 5翻倍福袋 6第二关入口 7子弹翻倍福袋 8子弹减半道具 9积分翻倍福袋 10积分减半道具 11弹弓满血福袋 12弹弓血量减半道具 | integer |  |  |
money |  | numeric |  |  |
is_operate | 是否分享或加为好机友 0否，1是 | integer | 0 |  |

## free_reasons_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 免费原因 | character varying |  |  |
comid | 车场id | bigint |  |  |
sort | 排序 | integer |  |  |

## group_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint | '-1' |  |
amount | 金额 | numeric | 0 |  |
create_time | 记录生成时间 | bigint |  |  |
uid | 收费员账号 | bigint | '-1' |  |
type | 类型 0：充值 1：支出 | integer |  |  |
source | 来源 0：停车费（非预付），1：提现，2：追缴停车费，3：预付停车费，4：预付退款（预付），5：预付补缴（预付金额不足） | integer |  |  |
orderid | 订单编号 | bigint | '-1' |  |
withdraw_id | 提现记录编号 | bigint | '-1' |  |
groupid | 运营集团账号 | bigint | '-1' |  |
remark | 备注 | character varying |  |  |
berthseg_id | 产生这笔流水所在的泊位段编号| bigint | '-1' |  |
berth_id | 产生这笔流水所在的泊位编号| bigint | '-1' |  |
is_delete | 账目流水状态 0：正常 1：删除 | integer | 0 |  |

## hasparker_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
anlysis_time |  | bigint |  |  |
total | 收费员在岗并且可支付车场的数量| bigint |  |  |

## ibeacon_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
buy_time |  | bigint |  |  |
ibcid |  | character varying |  |  |
state |  | bigint | 0 |  |

## induce_ad_history_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
induce_id | 诱导屏编号 | bigint | '-1' |  |
create_time | 创建时间 | bigint |  |  |
begin_time | 开始时间 | bigint |  |  |
end_time | 结束时间 | bigint |  |  |
ad | 广告内容 | character varying |  |  |
creator_id | 发布人 | bigint | '-1' |  |

## induce_ad_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
induce_id | 诱导屏编号 | bigint | '-1' |  |
ad | 广告 | character varying |  |  |
begin_time | 生效时间 | bigint |  |  |
end_time | 结束时间 | bigint |  |  |
isactive | 是否已发布 0：未发布 1：已发布 | integer | 0 |  |
create_time | 创建时间 | bigint |  |  |
update_time | 更新时间 | bigint |  |  |
publish_time | 信息发布时间 | bigint |  |  |
updator_id | 操作人编号 | bigint | '-1' |  |

## induce_module_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
induce_id | 诱导屏编号 | bigint | '-1' |  |
is_delete | 是否删除 0：正常 1：已删除 | bigint | 0 |  |
name | 显示区域的名称 | character varying |  |  |
create_time | 创建时间 | bigint |  |  |
sort | 显示区域排序，越小的越靠前 | integer | 0 |  |

## induce_park_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
induce_id | 诱导屏编号 | bigint | '-1' |  |
comid | 车场编号 | bigint | '-1' |  |
module_id | 诱导屏显示区域编号 | bigint | '-1' |  |
sort | 排序字段 | integer | 0 |  |

## induce_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 诱导屏名称 | character varying |  |  |
type | 诱导类型 0：一级诱导 1：二级诱导 2：三级诱导 | integer | 0 |  |
longitude | 经度 | numeric |  |  |
latitude | 纬度 | numeric |  |  |
address | 地址 | character varying |  |  |
cityid | 城市商户编号 | bigint | '-1' |  |
state | 状态 0：正常 1：故障 | integer | 0 |  |
create_time | 创建时间 | bigint |  |  |
update_time | 更新时间 | bigint |  |  |
creator_id | 创建者编号 | bigint | '-1' |  |
updator_id | 修改者编号 | bigint | '-1' |  |
deletor_id | 删除者编号 | bigint | '-1' |  |
is_delete | 0：正常 1：删除 | integer | 0 |  |
did |  硬件唯一编号 | character varying |  |  |
heartbeat_time | 最新一次心跳时间 | bigint |  |  |

## inspect_event_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
end_time |  | bigint |  |  |
type |  | integer | '-1' |  |
berthsec_id | 泊位段编号 | bigint |  |  |
uid | 收费员 | bigint | '-1' |  |
inspectid | 巡查员id | bigint | '-1' |  |
state | 状态  0待处理  1已处理 | integer |  |  |
remark |  -- 备注 | character varying |  |  |
event_pic | 时间处理图片 | character varying |  |  |
detailtype | 任务详情 | integer | '-1' |  |
dici_id | 泊位编号（com_park_tb的id） | bigint | '-1' |  |

## inspect_group_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uuid |  | character |  |  |
inspectgroup_name |  | character |  |  |
company_id |  | bigint |  |  |
create_time |  | bigint |  |  |
update_time |  | bigint |  |  |
is_active |  | integer |  |  |
chanid |  | bigint |  |  |

## liftrod_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id | 主键id | bigint | nextval('seq_liftrod_info_tb'::regclass) | NOT NULL |
channel_id | 记录车场的通道编号 | character varying |  |  |
channel_name | 记录车场的通道名称 | character varying |  |  |
operate | 操作抬杆的类型：0抬杆1落杆2暂停 | bigint |  |  |
state | 发送操作抬杆消息后车场执行结果返回-1 等待返回 0-失败 1-成功 | bigint |  |  |
comid | 收费系统车场编号 | character varying |  |  |

## lift_rod_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ctime |  | bigint |  |  |
uin | 收费员账户 | bigint |  |  |
comid | 车场编号 | bigint |  |  |
img | 图片地址 | character varying |  |  |
reason |  | integer | 0 |  |
liftrod_id | 车场抬杆记录id | character varying |  |  |
update_time | 修改时间 | bigint |  |  |
in_channel_id | 入场通道编号 | character varying |  |  |
out_channel_id | 出场通道编号 | character varying |  |  |
name | 车主姓名 | character varying |  |  |
car_number | 车牌编号 | character varying |  |  |
order_id | 车场订单编号 | character varying |  |  |
resume | 其他原因 | character varying |  |  |
pass_id | 通道名称 | character varying |  |  |
liftpic_table_name | 记录图片存储mongodb的表名 | character varying |  |  |

## local_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
version |  | integer |  |  |
cpu |  | character varying |  |  |
memory |  | character varying |  |  |
harddisk |  | character varying |  |  |
is_update | 是否允许更新  0不可以   1 可以 | integer | 0 |  |
create_time |  | bigint |  |  |
limit_time | 本地服务器到期时间 | bigint |  |  |
secret | 本地服务器车场密钥  校验是不是来自本地服务器 | character varying |  |  |
remark | 备注 | character varying |  |  |

## logo_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
type | 0：渠道  | integer | 0 |  |
orgid | 组织编号 | bigint | '-1' |  |
url_fir | 图片url | character varying |  |  |
url_sec | 图片url | character varying |  |  |
name |  | character varying |  |  |

## lottery_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 车主账户 | bigint |  |  |
orderid | 订单编号 | bigint |  |  |
create_time | 创建时间 | bigint |  |  |
lottery_result | 抽奖结果：0:一元余额，1：二元停车券,2:三元余额,3:未中奖 | integer |  |  |

## message_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
type | 0:收费员，1:车主，2：停车场系统管理员，3：总管理员 | integer |  |  |
create_time |  | bigint |  |  |
state | 0:未读，1：已读 | integer |  |  |
content | 内容  | character varying |  |  |
uin |  | bigint |  |  |

## mobilepay_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
comid |  | bigint |  |  |
mobilepay_count |  | integer |  |  |

## mobile_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
imei |  | character varying |  |  |
num |  | character varying |  |  |
mode |  | character varying |  |  |
price |  | numeric |  |  |
create_time |  | bigint |  |  |
editor |  | character varying |  |  |
distru_date |  | bigint |  |  |
uid |  | bigint |  |  |
comid |  | bigint |  |  |
uin |  | bigint |  |  |
money_3 |  | numeric |  |  |
order_3 |  | integer |  |  |
device_code | 设备编号 | character varying |  |  |
device_auth | 设备是否认证 0未认证 1已认证 | integer |  |  |
auth_user | 认证人 | bigint |  |  |
auth_time | 认证时间 | bigint |  |  |

## money_record_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
create_time |  | bigint |  |  |
amount |  | numeric |  |  |
uin |  | bigint |  |  |
type | 0:充值，1：消费，2：提现 | integer | '-1' |  |
remark | 说明 | character varying |  |  |
pay_type | 0余额，1支付宝，2微信，3网银，4余额+支付宝,5余额+微信,6余额+网银 | integer | 0 |  |

## money_set_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
uin |  | bigint |  |  |
mtype |  0:停车费,1:预订费,2:停车宝返现,3停车宝周奖 | integer | 0 |  |
giveto | 0:公司账户，1：个人账户 ，2：运营集团账户 | integer | 0 |  |

## monitor_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
net_status | 网络状态 1 正常 0 异常 | integer |  |  |
is_show | 是否显示 0-隐藏 1-显示 | integer | 1 |  |
show_order | 显示顺序（排序） | integer |  |  |
play_src | 播放地址 | character varying |  |  |
groupid |  | character varying |  |  |
channel_id |  | bigint |  |  |
name |  | character varying |  |  |
state | 状态 1-正常 0-删除 | integer | 1 |  |
comid |  | character varying |  |  |

## month_price_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
trade_no |  | character varying |  |  |
datastr |  | character varying |  |  |
ctime |  | bigint |  |  |

## no_payment_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
end_time |  | bigint |  |  |
order_id |  | bigint |  |  |
car_number | 车牌号 | character varying |  |  |
state | 状态 0未处理，1已处理 | integer | 0 |  |
uin | 车主帐号 | bigint | '-1' |  |
comid | 逃单所在车场编号 | bigint |  |  |
total | 逃单金额（应收金额） | numeric | 0 |  |
uid | 置为逃单的收费员编号（出场收费员） | bigint |  |  |
pursue_time | 追缴逃单时间 | bigint |  |  |
act_total | 追缴金额（实收金额） | numeric |  |  |
pursue_uid | 追缴收费员 | bigint | '-1' |  |
pursue_comid | 追缴订单的车场 | bigint | '-1' |  |
pursue_berthseg_id |  追缴订单所在的泊位段编号 | bigint | '-1' |  |
pursue_berth_id | 追缴订单所在的泊位编号 | bigint | '-1' |  |
berthseg_id | 逃单所在泊位段编号 | bigint | '-1' |  |
berth_id |  逃单所在泊位编号 | bigint | '-1' |  |
groupid | 逃单所在的运营集团 | bigint | '-1' |  |
prepay | 逃单已预付的金额 | numeric | 0 |  |
is_delete | 状态 0： 正常 1：删除 | integer | 0 |  |
pursue_groupid | 追缴订单所在的运营集团编号 | bigint | '-1' |  |

## online_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint | '-1' |  |
collector_online | 收费员在线数 | bigint | 0 |  |
inspector_online | 巡查员在线数 | bigint | 0 |  |
create_time | 统计时间 | bigint |  |  |
groupid | 运营集团编号 | bigint | '-1' |  |
cityid | 城市商户编号 | bigint | '-1' |  |

## order_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
order_count |  | integer |  |  |

## order_attach_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
settle_type | 0:正常结算，1：异常结算 | integer | 0 |  |
change_carnumber | 0:未更正过车牌，1：更正过车牌 | integer | 0 |  |
add_carnumber | 0:未补录车牌，1：补录车牌 | integer | 0 |  |
old_carnumber | 更正车牌之前的车牌 | character varying |  |  |
order_id | 订单id | bigint |  |  |

## order_log_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
order_id |  | bigint |  |  |
comid |  | bigint |  |  |
uin |  | bigint |  |  |
create_time |  | bigint |  |  |
log |  | character varying |  |  |
type | 0:创建订单，1：结算订单,2:优惠，3:现金收费 | integer |  |  |

## order_message_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
car_number | 车牌号 | character varying |  |  |
create_time |  | bigint |  |  |
orderid |  | bigint |  |  |
already_read |  | integer | 0 |  |
uin |  | bigint |  |  |
order_total |  | numeric |  |  |
state |  -- 0:未结算，1：待支付，2：支付完成, -1:支付失败 -2余额不足 | integer | 0 |  |
comid |  | bigint |  |  |
is_sale |  | integer | 0 |  |
btime |  | bigint |  |  |
etime |  | bigint |  |  |
duartion |  | character varying |  |  |
message_type | -- 0:订单消息，1：车位预定消息 2:充值购买产品 3直付订单消息（收费员用） 4Ibeacon解绑消息(收费员)  9Ibeacon支付消息(车主) | integer | 0 |  |

## order_reserve_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint |  | NOT NULL |
uin | 车主编号 | bigint |  | NOT NULL |
create_time | 预约开始时间 | bigint |  |  |
limit_time | 最晚到达时时间 | bigint |  |  |
state | 预约状态 0:欠费 1:已补缴 2:未入场 3:已取消 | integer |  |  |
car_number | 车牌号 | character varying |  |  |
phone | 手机号 | character varying |  |  |
pay_type | 支付类型 | integer |  |  |
prepaid |  | numeric |  |  |
prepaid_pay_time | 预约支付时间 | bigint |  |  |
type | 预约类型 0:车位预约 1：充电桩预约 | integer |  |  |
order_id |  | bigint |  |  |
arrive_time | 预计到达时间 | bigint |  |  |
plot_no | 车位号 | character varying |  |  |

## order_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
comid |  | bigint |  | NOT NULL |
uin |  | bigint |  | NOT NULL |
total |  | numeric | 0.00 |  |
state | 0未支付 1已支付 2:逃单 | integer | 0 |  |
end_time |  | bigint |  |  |
auto_pay | 0:正常结算，1：进场异常结算的订单，2：更正过车牌的订单，3:补录来车生成的订单 | integer | 0 |  |
pay_type | 0:帐户支付,1:现金支付,2:手机支付 3:包月 4:现金预支付 5：银联卡(中央预支付，后面废弃) 6：商家卡(中央预支付，后面废弃) 8：免费放行 9：刷卡 | integer | '-1' |  |
nfc_uuid |  | character varying |  |  |
uid | 收费员帐号 | bigint | '-1' |  |
car_number | 车牌 | character varying |  |  |
imei | 手机串号 | character varying |  |  |
pid | 计费方式：0按时(0.5/15分钟)，1按次（12小时内10元,前1/30min，后每小时1元） | integer | '-1' |  |
pre_state | 0:默认状态 1：车主预支付中 2：车主预支付中并且收费员刷卡 3：预支付完成 | integer | 0 |  |
type | 类型：0普通订单，1极速通，3本地化订单 4本地服务器订单 5本地生成线上结算订单 | integer | 0 |  |
need_sync | 预支付订单需要同步到线下  0:不需要  1:需要  2同步完成   3本地切换到线上线上生成的需要  4:线上结算的都需要同步下去 | integer | 0 |  |
ishd | 0否 1是不显示 | integer | 0 |  |
isclick | 0系统结算，1手动结算 | integer | 0 |  |
prepaid | 预付金额 | numeric | 0 |  |
prepaid_pay_time | 预支付时间 | bigint |  |  |
berthnumber | 泊位号 | bigint |  |  |
berthsec_id | 泊位段编号 | bigint |  |  |
groupid | 所属集团编号 | bigint |  |  |
out_uid | 出场收费员 | bigint | '-1' |  |
is_union_user | 0不是 1是  | integer | '-1' |  |
car_type_zh | 适配车场的各种车辆类型信息记录 | character varying |  |  |
order_id_local | 记录车场上传订单的编号 | character varying |  |  |
duration | 适配车场记录车辆停车时长信息 | character varying |  |  |
pay_type_en | 适配车场车辆的缴费类型，进行记录 | character varying |  |  |
freereasons_local | 适配车场车辆免费停车原因 | character varying |  |  |
islocked | 锁车状态: 0未锁定 1已锁定 2锁定中 3锁定失败 4解锁中 5解锁失败 | smallint | 0 |  |
lock_key | 锁车密码 | character varying |  |  |
in_passid | 入场通道编号 | character varying |  |  |
out_passid | 出场通道编号 | character varying |  |  |
amount_receivable | 应收金额 | numeric | 0.00 |  |
electronic_prepay |  | numeric | 0.00 |  |
electronic_pay | 电子结算 | numeric | 0.00 |  |
cash_prepay | 现金预付 | numeric | 0.00 |  |
cash_pay | 现金结算 | numeric | 0.00 |  |
reduce_amount | 减免金额 | numeric | 0.00 |  |
c_type | 进场类型 | character varying |  |  |
car_type | 车型 | character varying |  |  |
freereasons | 订单上传免费原因 | character varying |  |  |
remark | 车场出场信息备注 | character varying |  |  |
carpic_table_name | 记录订单图片在mongodb中存储的表名 | character varying |  |  |
work_station_uuid | 车场收费系统岗亭/工作站唯一标识 | character varying |  |  |

## order_ticket_detail_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
otid | 订单红包编号，对应order_ticket_tb表ID | bigint |  |  |
uin | 领券人 | bigint |  |  |
amount | 领取金额 | integer |  |  |
ttime | 领取时间 | bigint |  |  |
type | 0:老用户，1:新用户 | integer |  |  |
btype |  类型 0普通券，1微信打折券，2:车场专用券 3:车主认证1246专享红包（顺序发放）4 充值100返大礼包 5打飞机红包 | integer | 0 |  |
ticketid | 停车券编号 | bigint |  |  |

## order_ticket_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 发券人 | bigint |  |  |
order_id | 订单编号 | bigint |  |  |
money | 金额 为负数时，每张金额为这个负数的相反数 | integer |  |  |
bnum | 红包数 | integer |  |  |
ctime | 新建时间 | bigint |  |  |
btime | 开始领券时间 | bigint |  |  |
etime | 结束领券时间 | bigint |  |  |
exptime | 过期时间 | bigint |  |  |
bwords | 红包祝福语 | character varying |  |  |
type |  类型 0普通券，1微信打折券，2:车场专用券 3:车主认证1246专享红包（顺序发放）4 充值100返大礼包 5打飞机红包 6战绩分享 不限数 | integer | 0 |  |

## org_area_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 区域名称 | character varying |  |  |
state | 状态 0：正常 1：禁用 | integer | 0 |  |
groupid | 所属运营集团编号 | bigint | '-1' |  |
create_time | 创建时间 | bigint |  |  |

## org_channel_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 名称 | character varying |  |  |
state | 0:正常 1禁用 | integer | 0 |  |
create_time | 创建时间 | bigint |  |  |
logo_url | logo地址 | character varying |  |  |

## org_city_merchants

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ctime |  | bigint |  |  |
name | 名称 | character varying |  |  |
state | 0:正常 1：禁用 | integer | 0 |  |
balance | 余额 | numeric | 0 |  |
gps | 位置 | character varying |  |  |
address | 地理位置 | character varying |  |  |
is_group_pursue | 是否能跨集团追缴订单 0：不可以 1：可以 | smallint | 0 |  |
is_inpark_incity | 同一车牌可否在城市内重复入场 0不可以 1可以 | integer | 1 |  |
union_id |  | character varying |  |  |
ukey |  | character varying |  |  |

## org_group_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
state | 0：正常 1：删除 | integer | 0 |  |
name |  | character varying |  |  |
chanid | 渠道id | bigint | '-1' |  |
create_time |  | bigint |  |  |
cityid | 城市商户编号 | bigint | '-1' |  |
type | 公司属性 0：普通运营公司 1：充电桩运营公司 2：自行车运营公司 | integer | 0 |  |
balance |  余额 | numeric | 0 |  |
longitude | 经度 | numeric |  |  |
latitude | 纬度 | numeric |  |  |
address | 地址 | character varying |  |  |
serverid |  | character varying |  |  |
operatorid | 泊链运营商编号 | character varying |  |  |

## park_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
amount |  | numeric |  |  |
type | 0充值 1提现，2返现（已废弃） | integer |  |  |
create_time |  | bigint |  |  |
remark |  | character varying |  |  |
uid | 收费员账户 | bigint | '-1' |  |
source | 来源，0：停车费（非预付），1：返现，2：泊车费，3：推荐奖，4：补交现金（已废弃），5：车场提现，6：停车宝排行榜周奖，7：追缴停车费，8：车主预付停车费，9：预付退款（预付超额），10：预付补缴（预付金额不足） 11：订单退款 | integer |  |  |
orderid |  | bigint | '-1' |  |
withdraw_id | 提现记录编号 | bigint | '-1' |  |
berthseg_id | 产生这笔流水所在的泊位段编号| bigint | '-1' |  |
berth_id | 产生这笔流水所在的泊位编号| bigint | '-1' |  |
groupid | 运营集团账号 | bigint | '-1' |  |
is_delete | 账目流水状态 0：正常 1：删除| integer | 0 |  |

## park_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
comid |  | bigint |  |  |
share_count |  | integer | 0 |  |
used_count |  | integer | 0 |  |
month_used_count | 月卡车占用数 | integer | 0 |  |
time_used_count | 时租车占用数 | integer | 0 |  |

## park_charge_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
amount |  | numeric | 0 |  |
uin |  | bigint |  |  |
type | 0充值,1消费,2提现 | integer | 1 |  |
create_time |  | bigint |  |  |

## park_log_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id | 主键id | bigint |  | NOT NULL |
type | 类型 | character varying |  |  |
content | 内容 | character varying |  |  |
operate_time | 操作时间 | bigint |  |  |
operate_user | 操作员 | character varying |  |  |
remark | 备注 | character varying |  |  |
log_id | 车场日志编号 | character varying |  |  |
park_id | 记录对应的车场编号 | bigint |  |  |

## park_ticket_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  |  |
comid |  | bigint |  |  |
tnumber | 数量/每天 | integer |  |  |
money |  | numeric |  |  |
exptime | 有有效期(天) | integer |  |  |
haveget | 已领数量 | integer |  |  |

## park_token_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
park_id |  | character varying |  |  |
token |  | character varying |  |  |
login_time |  | bigint |  |  |
beat_time |  | bigint |  |  |
server_ip | 所在服务器IP | character varying |  |  |
source_ip | 客户端IP | character varying |  |  |
local_id | 收费终端编号，支持一个车场有多个收费系统登录 | character varying |  |  |

## parkuser_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  收费员登陆账号 | bigint |  |  |
amount |  | numeric |  |  |
type | 0:充值，1提现 | integer |  |  |
create_time |  | bigint |  |  |
remark |  | character varying |  |  |
target | 目标(来源或去处)：0：银行卡（提现），1：支付宝（提现），2：微信（提现），3：停车宝，4：车主付停车费（非预付）或者打赏收费员，5：追缴停车费，6：车主预付停车费，7：预付退款（预付超额），8：预付补缴（预付金额不足） | integer | 0 |  |
orderid |  | bigint | '-1' |  |
withdraw_id |  提现记录编号 | bigint | '-1' |  |
comid | 产生这笔流水所在的车场编号| bigint | '-1' |  |
berthseg_id | 产生这笔流水所在的泊位段编号 | bigint | '-1' |  |
berth_id | 产生这笔流水所在的泊位编号 | bigint | '-1' |  |
groupid | 运营集团账号 | bigint | '-1' |  |
is_delete | 账目流水状态 0：正常 1：删除 | integer | 0 |  |

## parkuser_cash_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 收费员账号 | bigint |  |  |
amount | 现金金额 | numeric | 0 |  |
orderid | 订单id | bigint | '-1' |  |
type | 0:岗亭收费 1：中央预支付收费 2：卡片操作 | integer | 0 |  |
create_time |  | bigint |  |  |
ctype | 0：收入，1：支出 | integer | 0 |  |
target | （该字段不适用type=1）0：停车费（非预付），1：预付停车费，2：预付退款（预付超额），3：预付补缴（预付不足），4：追缴停车费 5：卡片充值 6：卡片注销 | integer | 0 |  |
card_account_id | 卡片充值流水编号 | bigint | '-1' |  |
comid |  产生这笔流水所在的车场编号(索引) | bigint | '-1' |  |
berthseg_id |  产生这笔流水所在的泊位段编号(索引) | bigint | '-1' |  |
berth_id | 产生这笔流水所在的泊位编号(索引) | bigint |  |  |
groupid | 运营集团账号(索引) | bigint | '-1' |  |
is_delete |  账目流水状态 0：正常 1：删除 | integer | 0 |  |

## parkuser_comment_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uid |  | bigint |  |  |
uin |  | bigint |  |  |
ctime |  | bigint |  |  |
comments |  | character varying |  |  |
order_id |  | bigint |  |  |

## parkuser_income_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 主键（收费员账号、泊位编号、车场编号、运营集团编号） | bigint | '-1' |  |
prepay_cash | 现金预支付 | numeric | 0 |  |
add_cash | 现金补缴 | numeric | 0 |  |
refund_cash | 现金预支付退款 | numeric | 0 |  |
pursue_cash | 现金追缴 | numeric | 0 |  |
pfee_cash | 现金停车费（非预付） | numeric | 0 |  |
prepay_epay | 电子支付预支付 | numeric | 0 |  |
add_epay | 电子支付预付补缴 | numeric | 0 |  |
refund_epay | 电子支付预付退款 | numeric | 0 |  |
pursue_epay | 电子支付追缴 | numeric | 0 |  |
pfee_epay | 电子停车费（非预付） | numeric | 0 |  |
escape | 逃单未追缴的停车费 | numeric | 0 |  |
prepay_escape | 逃单未追缴的订单已预缴的金额 | numeric | 0 |  |
sensor_fee | 车检器停车费 | numeric | 0 |  |
create_time | 统计时间 | bigint | '-1' |  |
prepay_card | 刷卡预支付 | numeric | 0 |  |
add_card | 刷卡补缴 | numeric | 0 |  |
refund_card | 刷卡预支付退款 | numeric | 0 |  |
pursue_card | 刷卡追缴 | numeric | 0 |  |
pfee_card | 刷卡停车费（非预付） | numeric | 0 |  |
type | 0：收费员 1：泊位 2：车场 3：运营集团 | integer | 0 |  |
charge_card_cash | 卡片现金充值金额 | numeric | 0 |  |
return_card_count | 注销卡片数量 | integer | 0 |  |
return_card_fee | 注销卡片退还的余额 | numeric | 0 |  |
act_card_count | 激活卡片数量（卖卡数量） | integer | 0 |  |
act_card_fee | 激活卡片总面值（卖卡总面值） | numeric | 0 |  |
reg_card_count | 开卡数量 | integer | 0 |  |
reg_card_fee | 开卡总面值 | numeric | 0 |  |
bind_card_count | 卡片绑定用户数 | integer | 0 |  |

## parkuser_message_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
type | 0推荐提醒 1 活动提醒,2周奖提醒 | integer |  |  |
hasread |  是否已读：0未读，1已读 | integer | 0 |  |
ctime |  | bigint |  |  |
content |  | character varying |  |  |
uin | 用户/收费员帐号 | bigint |  |  |
title |  | character varying |  |  |

## parkuser_reward_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 车主 | bigint |  |  |
uid | 收费员 | bigint |  |  |
order_id |  | bigint |  |  |
money | 金额 | numeric |  |  |
ctime |  | bigint |  |  |
comid | 车场编号 | bigint |  |  |
ticket_id | 停车券编号 | bigint |  |  |

## parkuser_work_record_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
start_time |  | bigint |  |  |
end_time |  | bigint |  |  |
worksite_id |  | bigint | '-1' |  |
uid | 收费员id | bigint | '-1' |  |
berthsec_id | 泊位段 | bigint | '-1' |  |
device_code | 设备编号 | character varying |  |  |
chanid | 合作方号 | bigint |  |  |
uuid | 唯一编号 | character varying |  |  |
state | 0已签到  1已签退 | integer | 0 |  |
history_money | 上岗时，泊位段上的已预收金额 | numeric | 0 |  |
out_log | 签退小票内容 | character varying |  |  |
logon_state | 签入状态 0：正常 1：迟到 | smallint | 0 |  |
logoff_state | 签退状态 0：正常 1：早退 | smallint | 0 |  |
park_id | 记录车场编号 | bigint |  |  |

## park_verify_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
uin | 审核人--车主 | bigint |  |  |
isname | 0不准确，1准确 | integer |  |  |
islocal | 位置是否准确，0不准确，1准确 | integer |  |  |
ispay | 收费是否准确 0不正确，1正确 | integer |  |  |
ctime | 新建日期 | bigint |  |  |
isresume | 描述是否正确 0不正确，1正确  | integer |  |  |

## peakalert_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
comid |  | bigint | '-1' |  |
present | 在场车辆总数 | integer | 0 |  |
berths | 车位总数 | integer | 0 |  |

## phone_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 名称 | character varying |  |  |
tele_phone | 分机号 | bigint |  |  |
comid | 所属车场 | character varying |  |  |
park_phone | 车场主机号 | bigint |  |  |
group_phone | 集团主机号 | bigint |  |  |
monitor_id | 监控id | bigint |  |  |
groupid |  | character varying |  |  |
is_call | 是否有分机呼叫进来 1-是(需要切换到当前视频) 0-否/处理完毕 | integer |  |  |
call_time | 分机呼叫时间 | bigint |  |  |
main_phone_type | 呼叫主机性质 1-集团 0-车场 | integer |  |  |
state | 状态 1-正常 0-删除 | integer | 1 |  |

## price_assist_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
type | 0:每X小时X元 | integer | 0 |  |
assist_unit |  | integer |  |  |
assist_price |  | numeric | 0 |  |

## price_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
price |  | numeric | 0 |  |
state | 0正常，1注销 | bigint | 0 |  |
unit |  | integer |  |  |
pay_type | 0:按时段，1：按次 | integer |  |  |
create_time |  | bigint |  |  |
b_time |  | integer |  |  |
e_time |  | integer |  |  |
is_sale | 是否打折 0否，1是 | integer | 0 |  |
first_times | 首优惠时段，单位分钟 | integer | 0 |  |
fprice | 首优惠价格 | numeric | 0 |  |
countless | 零头计费时长，单位分钟 | integer | 0 |  |
free_time | 免费时长，单位:分钟 | integer | 0 |  |
fpay_type | 超免费时长计费方式，1:免费 ，0:收费  | integer | 0 |  |
isnight | 夜晚停车，0:支持，1不支持 | integer | 0 |  |
isedit | 是否可编辑价格，目前只对日间按时价格生效,0否，1是，默认0 | integer | 0 | NOT NULL |
car_type | 0：通用，1：小车，2：大车 | integer | 0 |  |
is_fulldaytime | 是否补足日间时长 0补全（默认）1不补全 | integer | 0 |  |
total24 | 24小时封顶价 | numeric | '-1' |  |
b_minute | 开始分钟 | integer | 0 |  |
e_minute | 结束分钟 | integer | 0 |  |
update_time | 记录车场编辑价格时的修改时间 | bigint |  |  |
price_id | 记录车场的价格编号 | character varying |  |  |
car_type_zh | 适配车场价格表中记录车辆类型的信息 | character varying |  |  |
describe | 车场价格描述信息记录 | character varying |  |  |
operate_type | 对数据的操作类型记录 | integer |  |  |
is_sync | 记录数据信息是否同步 | integer | 0 | NOT NULL |
is_delete | 记录云端价格是否被删除 | bigint | 0 |  |

## product_package_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
p_name |  | character varying |  |  |
b_time |  | integer |  |  |
e_time |  | integer |  |  |
remain_number |  | integer |  |  |
state |  | integer | 0 |  |
comid |  | bigint |  |  |
price |  | numeric |  |  |
bmin |  | integer | 0 |  |
emin |  | integer | 0 |  |
resume |  | character varying |  |  |
old_price | 原价 | numeric | 0 |  |
type | 0:全天 1夜间 2日间 3月卡时间内优惠 4指定小时内免费 | integer | 0 |  |
reserved | 是否固定车位：0不固定；1固定
 | integer | 0 |  |
limitday | 有效期到 | bigint |  |  |
favourable_precent | 优惠百分比 100免费，其它按百分比计算 | integer | 100 |  |
free_minutes | 免费时长 单位：分钟 | integer | 0 |  |
out_favourable_precent | 超过了时间段享受0%－100%的优惠幅度 | integer | 0 |  |
scope | 作用范围  默认0本车场有效  1父车场和旗下子车场有效 | bigint | 0 |  |
card_id | 车场月卡编号记录 | character varying |  |  |
update_time | 车场月卡套餐修改时间 | bigint |  |  |
create_time | 车场月卡套餐创建时间 | bigint |  |  |
describe | 车场月卡信息描述记录 | character varying |  |  |
operate_type | 记录停车场对月卡套餐的操作类型 | integer |  |  |
is_sync | 记录月卡套餐信息是否已经同步到车场 | integer |  |  |
is_delete | 记录云端月卡套餐是否被删除 | bigint | 0 |  |
car_type_id | - car_type_tb 表ID | character varying |  |  |
period | 缴费周期 月，季，半年，年 | character varying |  |  |

## qr_code_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
wid | worksitetb_ID | bigint |  |  |
comid |  | bigint |  |  |
uid | 收费员ID | bigint |  |  |
ctime | 新建时间 | bigint |  |  |
type | 0:NFC,1：收费员，2：车位，3:泊车员，4：车场 5：商户减免券 6:停车券 | integer |  |  |
state | 0正常 1不可用 | integer | 0 |  |
code |  | character |  |  |
isuse | 是否使用 0未使用，1已使用 | integer | 0 |  |
ticketid | 停车券id | bigint |  |  |
score | 收费员发专用券消耗的积分 | numeric | 0 |  |
isauto | 商户后台页面的二维码是不是要自动更新 | integer |  |  |

## qr_thirdpark_code

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
park_id | 第三方车场编号 | character varying |  |  |
union_id | 第三主厂商编号 | bigint |  |  |
code | 二维码 | character varying |  |  |

## recharge_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
amount |  | numeric |  |  |
create_time |  | bigint |  |  |
charge_type | 0:支付宝，1:微信支付，2:网上银行 | integer |  |  |

## recommend_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
pid | 推荐人id | bigint |  |  |
nid | 被推荐人的id | bigint |  |  |
type | 推荐目标：0：车主，1:车场，2：车主(虚拟账户) | integer |  |  |
state | 状态 0推荐中，1成功,3:推荐无效，用户绑定过微信公众号 | integer |  |  |
create_time | 日期 | bigint |  |  |
comid | 用户通过注册月卡会员注册车主时所在的车场id | bigint | '-1' |  |
money | 推荐奖励金额 | numeric | 0 |  |
openid | 微信公众号openid | character varying |  |  |

## recom_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
mobile | 用户，车场手机号  | character varying |  |  |
uin | 车场收费员帐号 | bigint |  |  |
type | 类型 0用户 1车场 | integer |  |  |
state | 状态 0推荐中，1成功 | integer |  |  |
create_time | 日期 | bigint |  |  |

## red_packet_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
trandno | 订单号!!!!! | character varying |  |  |
hbstate | 红包领取状态 | integer |  |  |
random | 生成随机字符串 | character varying |  |  |

## reg_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
bonus_num | 红包数 | integer |  |  |
reg_num | 注册数（车牌有效） | integer |  |  |
amount | 金额 | integer |  |  |
pv_number | pv数 | integer |  |  |
hit_number | 点击数 | integer |  |  |
down_num | 下载数 | integer |  |  |
ctime | 日期 | bigint |  |  |
atype | 类型：1今日头条，2传单红包，3节日红包，998直付红包，999收费员推荐，1000交易红包 | integer |  |  |
order_num | 产生消费数 | integer |  |  |

## register_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
reg_time |  | bigint |  |  |
reg_count |  | integer |  |  |
carnumber_count | 有车牌的注册用户 | integer |  |  |

## remain_berth_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint | '-1' |  |
berthseg_id | 泊位段编号 | bigint | '-1' |  |
amount | 泊位剩余数量 | bigint | 0 |  |
update_time | 数据更新时间 | bigint |  |  |
state | 0：正常 1：删除 | integer | 0 |  |
total | 泊位总数 | bigint | 0 |  |

## reward_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
score | 积分 | numeric |  |  |
type | 0:充值积分 1：消费积分 | integer |  |  |
create_time |  | bigint |  |  |
remark |  | character varying |  |  |
target | 0:打赏 1：订单红包 2：专用停车券 3:停车宝充值 | integer | 0 |  |
reward_id | 打赏记录id | bigint | '-1' |  |
orderticket_id | 订单红包id | bigint | '-1' |  |
ticket_id | 停车券id | bigint | '-1' |  |

## role_auth_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
auth |  | character varying |  |  |
role_id |  | bigint |  |  |

## sensor_online_anlysis_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid | 车场编号 | bigint | '-1' |  |
create_time | 统计时间 | bigint |  |  |
online | 在线车检器数量 | integer | 0 |  |
total | 总车检器数量 | integer | 0 |  |

## session_cache

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
sessionId |  | character varying |  |  |
sessionValue |  | character varying |  |  |

## share_log_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
s_number |  | integer | 0 |  |
create_time |  | bigint |  |  |
uin |  | bigint |  |  |

## shop_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | integer |  | NOT NULL |
shop_id | 商户编号 | integer |  |  |
shop_name | 商户名称 | character varying |  |  |
ticket_limit | 减免劵(小时) | integer |  |  |
ticketfree_limit | 全免劵(张) | integer |  |  |
ticket_money | 减免金额(元) | integer |  |  |
operate_time | 充值时间/减免劵生成时间 | bigint |  |  |
park_id | 车场编号 | bigint |  |  |
operator |  | bigint |  |  |
strid |  | character varying |  |  |
add_money |  | numeric |  |  |
operate_type | 1-续费2回收充值 | integer | 1 |  |

## shop_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 商户名称 | character varying |  |  |
address | 地址 | character varying |  |  |
mobile | 电话 | character varying |  |  |
phone |  | character varying |  |  |
comid |  | bigint |  |  |
ticket_limit | 停车券额度 | integer | 0 |  |
description | 描述 | character varying |  |  |
state | 0:正常 1：不可用 | integer | 0 |  |
create_time | 创建时间 | bigint |  |  |
ticketfree_limit | 全免券的张数上限 | integer | 0 |  |
ticket_type | 减免劵类型 1-减免时长 2-减免金额 | integer |  |  |
ticket_money | 减免金额 | integer | 0 |  |
default_limit | 默认显示额度 | character varying |  |  |
discount_percent | 商户折扣百分比 | numeric |  |  |
discount_money | 小时劵单价 每小时/元 | numeric | 1 |  |
validite_time | 有效期/小时 | integer | 24 |  |
ticket_unit | 减免劵单位 1-分钟 2-小时 3-天 4-元 | integer |  |  |
free_money | 全免劵单价 每张/元 | numeric |  |  |
hand_input_enable | 是否可手输额度 1 支持 0不支持 | integer | 1 |  |

## sim_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
pin | PIN码 | character varying |  |  |
mobile | 手机号码 | character varying |  |  |
money | 首次充值额 | numeric | 0 |  |
create_time | 入库时间 | bigint |  |  |
limit_time | 套餐过期时间 | bigint |  |  |
allot_time | 分配时间 | bigint |  |  |
creator_id | 入库人 | bigint | '-1' |  |
type | 绑定的设备类型 0：未绑定 1：POS机 2：基站 | integer | 0 |  |
device_id | 设备编号 | bigint | '-1' |  |
groupid | 运营集团编号 | bigint | '-1' |  |
state | 状态 0：正常 1：禁用 | integer | 0 |  |

## sites_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uuid |  | character varying |  |  |
voltage |  | numeric |  |  |
update_time |  | bigint |  |  |
longitude |  | numeric |  |  |
latitude |  | numeric |  |  |
create_time | 创建时间 | bigint |  |  |
heartbeat | 心跳时间 | bigint |  |  |
address | 基站地址 | character varying |  |  |
cityid | 城市商户编号 | bigint | '-1' |  |
name | 基站名称 | character varying |  |  |
state | 基站状态 0:故障 1:正常 2:删除 | integer |  |  |
comid | 车场编号 | bigint |  |  |
is_delete | 0：正常 1：禁用 | integer | 0 |  |
groupid | 运营集团编号 | bigint | '-1' |  |

## sites_voltage_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
voltage | 基站电压 | numeric |  |  |
create_time |  录入时间 | bigint |  |  |
site_id | 基站编号 | bigint | '-1' |  |

## slow_alert_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
url | 地址 | character varying |  |  |
start_time | 接口开始时间 | bigint |  |  |
end_time | 接口结束时间 | bigint |  |  |
local_host | 服务器地址 | character varying |  |  |

## sub_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
groupid | 运营集团编号 | bigint | '-1' |  |
amount | 金额 | numeric | 0 |  |
sub_orderid | 第三方的订单号 | character varying |  |  |
create_time | 记录时间 | bigint |  |  |
card_account_id | 卡片充值流水编号 | bigint | '-1' |  |
uin | 车主编号 | bigint | '-1' |  |
type | 充值方式 0：微信公众号 1：微信客户端 2：支付宝客户端 | integer | 0 |  |

## switch_line_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
create_time |  | bigint |  |  |
end_time |  | bigint |  |  |

## sync_info_pool_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint | '-1' |  |
table_name | 表名 | character varying |  |  |
table_id | 表记录中的id | bigint |  |  |
create_time |  | bigint |  |  |
operate | 0添加 1修改2删除 | integer | 0 |  |
state | 同步状态  0 未同步 1已同步 | integer | 0 |  |

## thirdpay_order_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
out_trade_no |  | character varying |  |  |
id |  | integer |  | NOT NULL |
order_id_local |  | character varying |  |  |

## ticket_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
create_time |  | bigint |  |  |
limit_day |  | bigint |  |  |
money | 减免时长 | integer | 0 |  |
state | 0-未使用,1-已使用，2-回收作废 | integer | 0 |  |
uin |  | bigint |  |  |
comid |  | bigint |  |  |
utime | 使用时间 | bigint | 0 |  |
umoney | 作用金额 | numeric | 0 |  |
type | 0普通停车券，1专用停车券 2微信专用打折券,3减时券,4全免券,5减免金额劵 | integer | 0 |  |
orderid | 订单id | bigint | '-1' |  |
bmoney | 0普通停车券，1专用停车券 2微信专用打折券,3减时券,4全免券,5减免金额劵 | numeric |  |  |
wxp_orderid | 微信公众号订单号 | character varying |  |  |
shop_id | 商户id | bigint |  |  |
resources | 来源 0停车宝，1购买 | integer | 0 |  |
is_back_money |  车主购买的停车券，未使用过期退款，0未退款，1已退款 | integer | 0 |  |
pmoney | 购买券车主支付金额 | numeric | 0 |  |
need_sync | -1默认不需要同步   0需要同步  1同步完成 | integer | '-1' |  |
ticket_id | 车场减免券编号 | character varying |  |  |
operate_user | 车场收费员（可以是车场收费员编号） | character varying |  |  |
state_zh | 减免券状态 | character varying |  |  |
car_number | 车牌编号 | character varying |  |  |
type_zh | 类型 | character varying |  |  |
remark | 备注 | character varying |  |  |

## ticket_uion_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
req_uin | 求合体车主 | bigint |  |  |
res_uin | 响应合体车主 | bigint |  |  |
req_tid | 求合体车主券编号 | bigint |  |  |
res_tid | 响应合体车主券编号 | bigint |  |  |
req_time | 开始时间 | bigint |  |  |
res_time | 响应时间 | bigint |  |  |
win_uin | 获胜者，-1失败，其它是获胜车主账户 | bigint |  |  |
state | 合体状态，0等待合体，1合体完成 | integer | 0 |  |
req_money |  | integer | 0 |  |
res_money |  | integer | 0 |  |

## ticket_view

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
uin |  | bigint |  |  |
limittime |  | bigint |  |  |

## tingchebao_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
amount |  | numeric |  |  |
type | 0:充值，1消费 | integer |  |  |
create_time |  | bigint |  |  |
remark |  | character varying |  |  |
utype | 0：停车代金券，1：支付宝服务费，2：微信服务费，3：车场返现，4：车主返现 5：泊车费 6：微信充值 7：支付宝充值 8：提现 | integer |  |  |
orderid |  | bigint | '-1' |  |
withdraw_id | 提现记录编号 | bigint | '-1' |  |
online_orderid | 第三方支付的订单号 | character varying |  |  |
uin | 操作人账号 | bigint | '-1' |  |

## tmp_p4top5_primarykey

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
table_type | 表 0：卡片表 1：车场表 2：泊位段表 3：泊位表 4：订单表 5：收费员表 6：车牌表 7：工作组表 8：工作组和泊位段对应表 9：工作组和收费员对应表  11：基站表 12：车检器表 13：用户表（车主） | integer |  |  |
p4_id | p4表主键 | bigint | '-1' |  |
p5_id | p5表主键 | bigint | '-1' |  |
groupid | 运营集团编号 | bigint | '-1' |  |

## transfer_url_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
url |  | character varying |  |  |
ctime | 创建时间 | bigint |  |  |
state | 0：正在推荐，1：推荐成功 | integer | 0 |  |

## union_park_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
company_name |  | character varying |  |  |
phone |  | character varying |  |  |
address |  | character varying |  |  |
resume |  | character varying |  |  |
longitude |  | numeric |  |  |
latitude |  | numeric |  |  |
parking_type | -- 车位类型，0地面，1地下，2占道 3室外 4室内 5室内外 | integer | 0 |  |
parking_total |  | integer | 0 |  |
share_number |  | integer | 0 |  |
money |  | numeric | 0 |  |
type | 停车场类型，0：付费，1免费 | integer | 0 |  |
isfixed | 0：未校验，1：已校验，2：申请校验，-1：一次未通过，-2：二次未通过，-3：三次未通过 | integer | 1 |  |
epay | 电子支付，0不支持，1支持 | integer | 1 |  |
remarks | 备注 | character varying |  |  |
empty | 空闲车位数 | integer | 0 |  |
union_state | 0 未上传 1已上传在使用 2已上传未审核 3已上传并禁用 | integer | 0 |  |
monthlypay |  | integer | 0 |  |
ctime |  | bigint |  |  |

## user_account_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 车主账户号，根据手机号查询 | bigint |  |  |
amount |  | numeric |  |  |
type | 0:充值，1:消费, | integer |  |  |
create_time |  | bigint |  |  |
remark |  标题 | character varying |  |  |
pay_type |  0余额，1支付宝，2微信，3网银，4余额+支付宝,5余额+微信,6余额+网银 ,7停车券,8活动奖励,9微信公众号，10微信公众号+余额，11微信打折券,12预支付返款 13停车券退款 14：停车宝 | integer | 0 |  |
uid | 支付给收费员的账户 | bigint | '-1' |  |
target | 0:普通支付，1直接支付给收费员，没有订单  2购买停车券 3停车券退款 4：账户余额退回第三方支付 | integer | 0 |  |
orderid |  | bigint | '-1' |  |

## user_friend_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
buin | 发起人 | bigint |  |  |
euin | 好友  | bigint |  |  |
ctime |  | bigint |  |  |
atype | 加入原因 0打灰机 | integer | 0 |  |
is_add_hx | 是否加入环信好友，0否，1是 | integer | 0 |  |

## user_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
nickname |  | character varying |  |  |
password |  | character varying |  |  |
strid |  | character varying |  |  |
sex |  | bigint | '-1' |  |
email |  | character varying |  |  |
phone |  | character varying |  |  |
mobile |  | character varying |  |  |
address |  | character varying |  |  |
resume |  | character varying |  |  |
reg_time |  | bigint |  |  |
logon_time |  | bigint |  |  |
logoff_time |  | bigint |  |  |
online_flag | 21:离线，22:在线，23:在岗，(泊车员状态)24:接车，25:取车，26:小休 | bigint |  |  |
comid |  | bigint |  |  |
auth_flag | 16：巡查员 17：开卡员 | bigint |  |  |
balance |  | numeric | 0 |  |
state | 0:正常，1：禁用，2：待审核，3：待补充，4：待跟进，5无价值 | integer | 0 |  |
recom_code | 推荐码，车场停车员的帐号 | bigint |  |  |
md5pass |  | character varying |  |  |
cid | 用户消息帐号，用于消息推送 | character varying |  |  |
department_id | 部门ID | bigint |  |  |
media | 媒体来源 | integer | 0 |  |
isview | 是否可以收费，0不可以，1可以收费 | integer | 1 |  |
collector_pics | 收费员上传的图片个数 | integer | 0 |  |
collector_auditor | 审核人员 | bigint |  |  |
imei | 手机串号 | character |  |  |
client_type | 0:android,1:ios | integer | 0 |  |
version | 版本号 | character |  |  |
wxp_openid | 微信公众号openid | character varying |  |  |
wx_name |  | character varying |  |  |
wx_imgurl |  | character varying |  |  |
shop_id | 商户的id | bigint |  |  |
credit_limit | 信用额度 | numeric | 0 |  |
is_auth | 是否认证通过，0否，1是 | integer | 0 |  |
reward_score | 打赏积分 | numeric | 0 |  |
firstorderquota | 首单额度 | numeric | 8 |  |
rewardquota | 打赏最高限券 | numeric | 2 |  |
recommendquota |  推荐奖额度   默认5块 | numeric | 5 |  |
ticketquota | -- 默认-1  不限制 | numeric | '-1' |  |
hx_name | 环信账户 | character varying |  |  |
hx_pass | 环信密码 | character varying |  |  |
role_id | 角色ID | bigint | '-1' |  |
order_hid | 0否，1设置 | integer | 0 |  |
chanid | 渠道编号 | bigint | '-1' |  |
groupid | 集团id | bigint | '-1' |  |
creator_id | 创建者编号 | bigint |  |  |
cityid | 城市商户编号 | bigint | '-1' |  |
union_state | 上传到泊链状态：0 未上传 1已上传并使用 2已上传未审核 3已上传并禁用 | integer | 0 |  |
upload_union_time | 上传时间 | bigint |  |  |
member_id | 停车场会员编号记录 | character varying |  |  |
operate_type | 记录操作类型1：添加，2：修改，3：删除 | integer |  |  |
is_sync | 是否已同步，0：未同步，1已同步 | integer | 0 | NOT NULL |
update_time |  | bigint |  |  |
user_id |  | character varying |  |  |

## user_liuyan_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
fuin | 发消息人 | bigint |  |  |
message | 留言内容 | character varying |  |  |
ctime |  | bigint |  |  |
is_read | 是否已读 0未读，1已读 | integer |  |  |
tuin | 接收人 | bigint |  |  |

## user_local_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uid | 收费员账号 | bigint |  |  |
distance |  | numeric |  |  |
is_onseat | 是否在位，0否，1是 | integer |  |  |
lat |  | numeric |  |  |
lon |  | numeric |  |  |
ctime | h  | bigint |  |  |

## user_log_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint |  | NOT NULL |
create_time |  | bigint |  | NOT NULL |
logs |  | character varying |  |  |
type | 100:创建停车场，101：修改停车场，102：删除停车场，201：修改管理员，202：创建停车员，203：修改停车员，204：禁用停车员，205：删除停车员，206：修改密码，207：添加价格，208：修改价格，209：删除价格，210：添加包月产品，211：删除包月，300：添加市场专员，301修改市场专员，302删除市场专员，400：添加商圈，401：编辑商圈，402：删除商圈 | integer |  |  |
uid | 登录帐号 | character varying |  |  |

## user_message_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
type | 0 支付失败提醒1 红包提醒2 自动支付提醒3 注册提醒 4停车入场提醒5活动提醒6 推荐停车员 7收款提醒 8充值消息 9退款消息 | integer |  |  |
hasread |  是否已读：0未读，1已读 | integer | 0 |  |
ctime |  | bigint |  |  |
content |  | character varying |  |  |
uin | 用户/收费员帐号 | bigint |  |  |
title |  | character varying |  |  |

## user_payaccount_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 车主账号 | bigint |  |  |
type | 0:支付宝，1:微信 | integer |  |  |
account |  | character varying |  |  |
ctime |  | bigint |  |  |

## user_pic_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
pic_url | 头像地址 | character varying |  |  |
state | 状态 0在用 1备用 | integer |  |  |
ctime | 上传日期 | bigint |  |  |
uin | 用户账号 | bigint |  |  |
driver_year | 驾龄 | numeric |  |  |
driver_pic | 证件照片 | character varying |  |  |
utime | 更新时间 | bigint |  |  |
resume | 批注 | character varying |  |  |

## user_preaddfriend_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
buin | 自己账号 | bigint |  |  |
euin | 车友账号 | bigint |  |  |
atype | 好友来源 1同车场车友 2.... | integer |  |  |
resume | 好友类型说明 | character varying |  |  |
ctime | 添加日期 | bigint |  |  |
utime | 更新日期 | bigint |  |  |

## user_profile_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
low_recharge | 帐号余额最低冲值提醒 | integer | 30 |  |
voice_warn | 自动结算 | integer | 0 |  |
auto_cash | 自动结算 | integer | 0 |  |
enter_warn | 入场提醒 | integer | 0 |  |
create_time |  | bigint |  |  |
update_time |  | bigint |  |  |
limit_money | 最高自动支付金额,0不自动支付,-1总是自动支付 | integer | '-100' |  |
bolink_limit | 泊链限额 | numeric | 0 |  |

## user_role_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
role_name |  | character varying |  |  |
state |  | integer | 0 |  |
id |  | bigint |  | NOT NULL |
oid | 组织类型 | bigint |  |  |
resume | 说明 | character varying |  |  |
type | 0 管理员 其它成员 | integer |  |  |
adminid | 所属管理员账户 | bigint |  |  |
is_inspect | 是否有巡查功能  默认0无  1有 | integer | 0 |  |
is_collector | 是否有收费功能 0：无 1：有 | integer | 0 |  |
is_opencard | 是否有激活卡片功能 0：无 1：有 | integer | 0 |  |

## user_session_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
token |  | character varying |  | NOT NULL |
uin |  | bigint |  | NOT NULL |
create_time |  | bigint |  | NOT NULL |
comid |  | bigint |  |  |
version | 客户端版本号 | character varying |  |  |
groupid | 集团编号 | bigint |  |  |

## user_worksite_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
worksite_id |  | bigint |  |  |
uin | 收费员账号 | bigint |  |  |

## verification_code_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
verification_code |  | integer |  |  |
uin |  | bigint |  |  |
create_time |  | bigint |  |  |
state |  | bigint |  |  |

## vip_apply_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
mobile |  | character varying |  |  |
address |  | character varying |  |  |
cname |  | character varying |  |  |
car_image |  | character varying |  |  |
state |  | integer |  |  |
uid |  | bigint |  |  |

## vip_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
uin |  | bigint |  |  |
comid |  | bigint |  |  |
bcount |  | bigint |  |  |
acttotal |  | numeric |  |  |
atotal |  | numeric |  |  |
create_time |  | bigint |  |  |
e_time |  | bigint |  |  |
id |  | bigint |  |  |

## visit_info_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uid |  | bigint |  | NOT NULL |
contacts |  | bigint |  |  |
address |  | character varying |  |  |
create_time |  | bigint |  |  |
state |  | integer |  |  |
visit_content |  | character varying |  |  |

## withdrawer_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
comid |  | bigint | '-1' |  |
create_time |  | bigint |  |  |
amount |  | numeric | 0 |  |
state |  -- 0:等待审核，2已审核，3已到帐，4提现失败 | integer | 0 |  |
update_time | 处理日期 | bigint |  |  |
acc_id | 帐号编号 | bigint |  |  |
uin |  操作人账号 | bigint | '-1' |  |
wtype |  1个人提现，0公司提现  2对公提现 | integer | 0 |  |
remark | 备注 | character varying |  |  |
groupid |  运营集团编号 | bigint | '-1' |  |
cityid |  城市商户编号 | bigint | '-1' |  |

## work_berthsec_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
berthsec_id | 泊位段编号 | bigint |  |  |
work_group_id | 工作组编号 | bigint | '-1' |  |
id |  | bigint |  | NOT NULL |
state | 是否已签到 0：否 1: 是 | integer |  |  |
is_delete | 0 正常 1 已删除  | integer | 0 |  |
inspect_group_id | 巡查组id | bigint | '-1' |  |

## work_detail_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
workid | 签到表编号 | bigint |  |  |
uid | 收费员编号 | bigint |  |  |
create_time | 时间 | bigint |  |  |
orderid | 进场订单编号 | bigint |  |  |
bid | 泊位编号 | bigint |  |  |
berthsec_id | 泊位段编号 | bigint |  |  |

## work_employee_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
work_group_id | 工作组编号 | bigint |  |  |
employee_id | 收费员编号 | bigint |  |  |
id |  | bigint |  | NOT NULL |
state | 是否删除 0：否 1 ：是 | integer |  |  |

## work_group_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uuid | 唯一编号 | character |  |  |
workgroup_name | 工作组名称 | character |  |  |
company_id | 运营公司 | bigint |  |  |
create_time |  | bigint |  |  |
update_time |  | bigint |  |  |
is_active | 是否可用 0 否1是 | integer |  |  |
chanid | 合作方号 | bigint |  |  |

## work_inspector_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
inspect_group_id | 巡查组编号 | bigint |  |  |
inspector_id | 巡查员编号 | bigint |  |  |
state | 是否删除 0：否 1 ：是 | integer |  |  |

## work_time_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
b_hour | 上班(小时) | smallint | 0 |  |
b_minute | 上班（分钟） | smallint | 0 |  |
e_hour | 下班(小时) | smallint | 0 |  |
e_minute | 下班(分钟) | smallint | 0 |  |
role_id | 角色编号 | bigint | '-1' |  |
is_delete | 0：正常 1：删除 | smallint | 0 |  |

## wxp_user_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
openid | 微信公众号用户openid | character varying |  |  |
create_time |  | bigint |  |  |
uin | 用户ID | bigint |  |  |
balance | 余额 | numeric | 0 |  |
car_number | 车牌号 | character varying |  |  |
union_state | 是否已同步到泊链 0未同步 1已同步 | integer | 0 |  |

## zld_black_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
ctime |  | bigint |  |  |
utime |  | bigint |  |  |
uin | 车主账户 | bigint |  |  |
state | 状态 0正常，1漂白 | integer |  |  |
remark | 原因 | character varying |  |  |
comid | 车场编号 | bigint | '-1' |  |
car_number | 车牌号 | character varying |  |  |
black_uuid | 收费系统唯一编号 | character varying |  |  |
operator | 操作人 | character varying |  |  |

## zld_game_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin |  | bigint |  |  |
scroe |  | integer |  |  |
ctime |  | bigint |  |  |
iswin | 是否获胜 0否 1是 | integer | 0 |  |
type | 类型，0普通红包，1打折红包 | integer |  |  |
tid | 券编号 | bigint |  |  |

## zld_organize_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name | 名称 | character varying |  |  |
pid | 上级编号 | bigint |  |  |
type | 类型 ---zld_orgtype_tb | bigint |  |  |

## zld_orgtype_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
name |  | character varying |  |  |
pid | 父级组织类型编号 | bigint | 0 |  |
state | 状态 0：正常 1：禁用 | integer | 0 |  |
create_time | 创建时间 | bigint |  |  |
delete_time | 删除时间 | bigint |  |  |
update_time |  最后一次更新时间 | bigint |  |  |
sort |  排序 | integer |  |  |
creator_id | 创建者编号 | bigint |  |  |
deletor_id | 删除者编号 | bigint |  |  |

## zld_protocol_tb

column | comment | type | default | constraints | values
--- | --- | --- | --- | --- | ---
id |  | bigint |  | NOT NULL |
uin | 车主账户 | bigint |  |  |
ctime |  | bigint |  |  |
is_remind | 是否再次提醒 0不提醒 ，1提醒 | integer |  |  |
agree | 是否同意 0不同意，1同意 | integer |  |  |
