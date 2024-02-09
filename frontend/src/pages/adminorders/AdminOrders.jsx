import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../app/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../store/order/orderSlice";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import Pagination from "../../components/pagination/Pagination";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, orderStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden font-sans bg-gray-100">
          <div className="w-full">
            <ContentWrapper>
              <div className="my-6 bg-white rounded shadow-md">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
                      <th
                        className="px-0 py-3 text-left cursor-pointer"
                        onClick={(e) =>
                          handleSort({
                            sort: "_id",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Order id#{" "}
                        {sort._sort === "_id" &&
                          (sort._order === "asc" ? (
                            <FaArrowUp className="inline w-4 h-4"></FaArrowUp>
                          ) : (
                            <FaArrowDown className="inline w-4 h-4"></FaArrowDown>
                          ))}
                      </th>
                      <th className="px-0 py-3 text-left">Items</th>
                      <th
                        className="px-0 py-3 text-left cursor-pointer"
                        onClick={(e) =>
                          handleSort({
                            sort: "totalPrice",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Total Amount{" "}
                        {sort._sort === "totalPrice" &&
                          (sort._order === "asc" ? (
                            <FaArrowUp className="inline w-4 h-4"></FaArrowUp>
                          ) : (
                            <FaArrowDown className="inline w-4 h-4"></FaArrowDown>
                          ))}
                      </th>
                      <th className="px-0 py-3 text-center">
                        Shipping Address
                      </th>
                      <th className="px-0 py-3 text-center">Order Status</th>
                      <th className="px-0 py-3 text-center">Payment Method</th>
                      <th className="px-0 py-3 text-center">Payment Status</th>

                      <th className="px-0 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-light text-gray-600">
                    {orders &&
                      orders?.map((order) => (
                        <tr
                          key={order?.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="px-0 py-3 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2"></div>
                              <span className="font-medium">{order?.id}</span>
                            </div>
                          </td>
                          <td className="px-0 py-3 text-left">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                  />
                                </div>
                                <span>
                                  {item.product.title} - #{item.quantity} - $
                                  {item.discountPrice}
                                </span>
                              </div>
                            ))}
                          </td>
                          <td className="px-0 py-3 text-center">
                            <div className="flex items-center justify-center">
                              ${order.totalPrice}
                            </div>
                          </td>
                          <td className="px-0 py-3 text-center">
                            <div className="">
                              <div>
                                <strong>{order.selectedAddress.name}</strong>,
                              </div>
                              <div>
                                {order.selectedAddress.additionalLocation},
                              </div>
                              <div>{order.selectedAddress.city}, </div>
                              <div>{order.selectedAddress.company}, </div>
                              <div>{order.selectedAddress.postalCode}, </div>
                              <div>{order.selectedAddress.phoneNo}, </div>
                            </div>
                          </td>
                          <td className="px-0 py-3 text-center">
                            {order.id === editableOrderId ? (
                              <select
                                onChange={(e) => handleOrderStatus(e, order)}
                              >
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColor(
                                  order.orderStatus
                                )} py-1 px-3 rounded-full text-xs`}
                              >
                                {order.orderStatus}
                              </span>
                            )}
                          </td>

                          <td className="px-0 py-3 text-center">
                            <div className="flex items-center justify-center">
                              {order.paymentMethod}
                            </div>
                          </td>

                          <td className="px-0 py-3 text-center">
                            {order.id === editableOrderId ? (
                              <select
                                onChange={(e) =>
                                  handleOrderPaymentStatus(e, order)
                                }
                                // value={order.status}
                              >
                                <option value="pending">Pending</option>
                                <option value="received">Received</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColor(
                                  order.paymentStatus
                                )} py-1 px-3 rounded-full text-xs`}
                              >
                                {order.paymentStatus}
                              </span>
                            )}
                          </td>

                          <td className="px-0 py-3 text-center">
                            <div className="flex justify-center item-center">
                              <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                                <MdEdit
                                  className="w-8 h-8"
                                  onClick={(e) => handleEdit(order)}
                                ></MdEdit>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </ContentWrapper>
          </div>
        </div>

        <Pagination
          page={page}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>
    </>
  );
};

export default AdminOrders;
