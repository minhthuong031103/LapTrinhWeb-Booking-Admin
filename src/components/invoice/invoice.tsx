import {
  addDaysToDateString,
  convertPriceNotVND,
  getDaysAmountInMonth,
} from '@/lib/utils';
import {
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { getDaysInMonth } from 'date-fns';
import { Fragment } from 'react';
import { getText } from 'number-to-text-vietnamese';

const Invoice = ({ data }) => {
  Font.register({
    family: 'Times New Roman',
    fonts: [
      {
        src: '/fonts/SVN-TimesNewRoman2.ttf',
      },
      {
        src: '/fonts//SVN-TimesNewRoman2bold.ttf',
        fontWeight: 700,
      },
      {
        src: '/fonts//SVN-TimesNewRoman2italic.ttf',
        fontStyle: 'italic',
      },
      {
        src: '/fonts//SVN-TimesNewRoman2bolditalic.ttf',
        fontStyle: 'italic',
        fontWeight: 700,
      },
    ],
  });
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      fontFamily: 'Times New Roman',
      flexDirection: 'column',
    },

    spaceBetween: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#3E3E3E',
    },

    titleContainer: { flexDirection: 'row', marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 13, textAlign: 'center', fontWeight: 700 },

    addressTitle: { fontSize: 11 },

    invoice: { fontSize: 20 },

    invoiceNumber: { fontSize: 11 },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 10,
      fontSize: 10,
      paddingTop: 4,
      paddingLeft: 7,
      paddingRight: 7,
      flex: 1,
      height: 23,
      backgroundColor: '#DEDEDE',
      borderColor: 'black',
      borderStyle: 'dashed',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    theader2: { flex: 2, borderRightWidth: 1, borderBottomWidth: 1 },
    theader3: {
      flex: 0.5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
    },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      borderStyle: 'dashed',
      paddingRight: 7,
      flex: 1,
      borderColor: 'black',
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingLeft: 7,
      paddingRight: 7,
      flex: 3.8,
      paddingTop: 4,
      borderColor: 'black',
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderStyle: 'dashed',

      borderRightWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
    tbody3: {
      flex: 0.5,
      borderRightWidth: 1,
      borderLeftWidth: 1,
    },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              HÙNG LUẬT GROUP
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              Địa chỉ: 123, Mai Phú Thọ, Q.2, TPHCM.
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 9,
              }}
            >
              Điện thoại:{' '}
              <Text style={{ color: 'blue' }}>0963618637 (Mr Bình)</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.reportTitle}>PHÒNG</Text>
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 7,
              border: '1px solid black',
              borderRadius: '50%',
              marginTop: 7,
            }}
          >
            <Text style={{ fontSize: 14, color: 'blue', fontWeight: 700 }}>
              {data.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Information = () => (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: 700 }}>
        THÔNG BÁO TIỀN PHÒNG TRỌ THÁNG {new Date().getMonth() + 1}/
        {new Date().getFullYear()}
      </Text>
      <Text style={{ fontSize: 13, fontWeight: 700 }}>
        (Từ ngày {data.startDate} đến {data.endDate})
      </Text>
    </View>
  );
  const CustomerInfo = () => (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 11 }}>
          - Khách hàng:{' '}
          <Text style={{ fontWeight: 700 }}>{data?.clientName}</Text>
        </Text>
        <Text style={{ fontSize: 11 }}>
          - Số điện thoại:{' '}
          <Text style={{ fontWeight: 700 }}>{data?.clientPNumber}</Text>
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 11 }}>
          - Ngày thuê:{' '}
          <Text style={{ fontWeight: 700 }}>{data?.daySigned}</Text>
        </Text>
        <Text style={{ fontSize: 11 }}>
          - Tiền phòng:{' '}
          <Text style={{ fontWeight: 700 }}>
            {convertPriceNotVND(data.roomPrice)}
          </Text>
        </Text>
      </View>
    </View>
  );
  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={[styles.theader, styles.theader3]}>
        <Text style={{ fontWeight: 700, fontSize: 11 }}>STT</Text>
      </View>
      <View style={styles.theader}>
        <Text style={{ fontWeight: 700, fontSize: 11 }}>Nội dung</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text style={{ fontWeight: 700, fontSize: 11 }}>
          Đơn giá x Đơn vị tính
        </Text>
      </View>
      <View style={styles.theader}>
        <Text style={{ fontWeight: 700, fontSize: 11 }}>Thành tiền</Text>
      </View>
    </View>
  );
  const tableData = [
    {
      id: 1,
      name: 'Tiền thuê phòng',
      unit:
        data.dayStayed === getDaysInMonth(new Date())
          ? 'Trọn tháng'
          : `${data.dayStayed}/${getDaysInMonth(new Date())} ngày`,
      price: `${convertPriceNotVND(data.roomPrice)}đ/tháng`,
      total: convertPriceNotVND(
        Math.floor(
          (Number(data.roomPrice) * Number(data.dayStayed)) /
            getDaysAmountInMonth(
              new Date().getMonth() + 1,
              new Date().getFullYear(),
            ),
        ),
      ),
    },
    {
      id: 2,
      name: 'Điện và Phí ANTT',
      unit: `${
        Number(data.oldElectric) >= Number(data.newElectric)
          ? 0
          : Math.floor(
              (Number(data.newElectric) - Number(data.oldElectric)) * 10,
            ) / 10
      } (mới ${Math.floor(data.newElectric * 10) / 10} - cũ ${
        data.oldElectric
      })`,
      price: `${convertPriceNotVND(data.electricPrice)}đ/KWh`,
      total: convertPriceNotVND(data.totalElectricPrice),
    },
    {
      id: 3,
      name: 'Nước',
      unit: `${data.peopleAmount} người`,
      price: `${convertPriceNotVND(data.waterPrice)}đ/người`,
      total: convertPriceNotVND(data.totalWaterPrice),
    },
    {
      id: 4,
      name: 'Tiền thang máy',
      unit: `${data.peopleAmount} người`,
      price: `${convertPriceNotVND(data.elevatorPrice)}đ/người`,
      total: convertPriceNotVND(data.totalElevatorPrice),
    },

    {
      id: 5,
      name: 'Tiền internet',
      unit: '1 phòng',
      price: `${convertPriceNotVND(data.internetPrice)}đ/phòng`,
      total: convertPriceNotVND(data.internetPrice),
    },
    {
      id: 6,
      name: 'Tiền dịch vụ',
      unit: '1 phòng',
      price: `${convertPriceNotVND(data.servicePrice)}đ/phòng`,
      total: convertPriceNotVND(data.servicePrice),
    },
    {
      id: 7,
      name: 'Tiền phụ thu',
      unit: `${data.peopleRealStayed}/4 người`,
      price: `${convertPriceNotVND(data.surcharge)}đ/số người quá quy định`,
      total: convertPriceNotVND(
        Number(data.peopleRealStayed) - 4 > 0
          ? (Number(data.peopleRealStayed) - 4) * Number(data.surcharge)
          : 0,
      ),
    },
    {
      id: 8,
      name: 'Tiền giữ xe',
      unit: `${data.vehicleAmount} xe`,
      price: `${convertPriceNotVND(data.parkingPrice)}đ/xe`,
      total: convertPriceNotVND(data.totalParkingPrice),
    },
    {
      id: 9,
      name: 'Tiền nợ cũ',

      price: `${convertPriceNotVND(data.oldDebt)}đ`,
      total: convertPriceNotVND(data.oldDebt),
    },
    {
      id: 10,
      name: 'Tiền nợ mới',

      price: `${convertPriceNotVND(data.newDebt)}đ`,
      total: `- ${convertPriceNotVND(data.newDebt)}`,
    },
    {
      id: 11,
      name: 'Chi phí phát sinh khác',

      price: `${convertPriceNotVND(data.otherPrice)}đ`,
      total: convertPriceNotVND(data.otherPrice),
    },
  ];
  const TableBody = () =>
    tableData.map(item => (
      <Fragment key={item.id}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={[styles.tbody, styles.tbody3]}>
            <Text style={{ fontSize: 11 }}>{item.id}</Text>
          </View>
          <View style={styles.tbody}>
            <Text style={{ fontSize: 11 }}>{item.name}</Text>
          </View>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text style={{ fontSize: 11 }}>
              {item.price}
              {item.unit && ` x ${item.unit}`}
            </Text>
          </View>
          <View
            style={[
              styles.tbody,
              { flexDirection: 'row', justifyContent: 'flex-end' },
            ]}
          >
            <Text style={{ fontSize: 11 }}>{item.total}</Text>
          </View>
        </View>
      </Fragment>
    ));
  const TableTotal = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <View style={styles.total}>
        <Text style={{ fontSize: 12, fontWeight: 700 }}>TỔNG CỘNG</Text>
      </View>
      <View
        style={[
          styles.tbody,
          { flexDirection: 'row', justifyContent: 'flex-end' },
        ]}
      >
        <Text style={{ fontWeight: 700, color: 'blue', fontSize: 12 }}>
          {convertPriceNotVND(data.suspenseMoney)}
        </Text>
      </View>
    </View>
  );
  const TotalText = () => (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 11,
        marginTop: 5,
      }}
    >
      <Text>
        (Bằng chữ:{' '}
        <Text style={{ fontWeight: 700 }}>
          {getText(data.suspenseMoney, ',').charAt(0).toUpperCase() +
            getText(data.suspenseMoney, ',').slice(1)}{' '}
          đồng
        </Text>
        )
      </Text>
      <Text>
        (<Text style={{ textDecoration: 'underline' }}>Ghi chú</Text>:{' '}
        {data.note})
      </Text>
    </View>
  );
  const Payment = () => (
    <View
      style={{
        paddingHorizontal: 2,
        paddingVertical: 3,
        border: '1px dashed black',
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 10 }}>
        Quý khách thanh toán tiền mặt, hoặc chuyển khoản vào TK "{' '}
        <Text style={{ fontWeight: 700, color: 'blue' }}>{data?.bankName}</Text>{' '}
        "
      </Text>
      <Text>
        - Số TK Ngân hàng{' '}
        {`${data?.bank?.charAt(0).toUpperCase()}${data?.bank?.slice(1)}`}:{' '}
        <Text style={{ fontWeight: 700, color: 'blue' }}>
          {data?.bankNumber}
        </Text>
        . Nội dung chuyển khoản:{' '}
        <Text style={{ fontWeight: 700, color: 'blue' }}>
          {data.name} T{new Date().getMonth() + 1}/{new Date().getFullYear()}
        </Text>
      </Text>
    </View>
  );
  const Note = () => (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: 700, color: 'blue' }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'black',
          }}
        >
          *{' '}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'underline',
            color: 'black',
          }}
        >
          Lưu ý
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'black',
          }}
        >
          :{' '}
        </Text>
        Vui lòng nộp tiền trước ngày{' '}
        <Text style={{ fontSize: 14 }}>
          {addDaysToDateString(data.endDate, 7)}
        </Text>
      </Text>
      <Text
        style={{ fontSize: 12, fontWeight: 700, color: 'black', marginTop: 7 }}
      >
        Trân trọng cảm ơn sự hợp tác của quý khách!
      </Text>
    </View>
  );
  const Sign = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 30,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 700 }}>Ban Quản lý</Text>
        <Text
          style={{
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 700,
            marginTop: 5,
          }}
        >
          Chữ ký, ghi rõ họ tên
        </Text>
      </View>
    </View>
  );
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Information />
        <CustomerInfo />
        <TableHead />
        <TableBody />
        <TableTotal />
        <TotalText />
        <Payment />
        <Note />
        <Sign />
      </Page>
    </Document>
  );
};
export default Invoice;
